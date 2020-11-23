import { CameraPhoto, CameraResultType, CameraSource, Capacitor, FilesystemDirectory, Plugins } from '@capacitor/core';
import { onMounted, ref, watch } from 'vue';
import { isPlatform } from '@ionic/vue';

export function usePhotoGallery() {

    const { Camera, Filesystem, Storage } = Plugins;
    const photos = ref<Photo[]>([]);
    const PHOTO_STORAGE = 'photos';

    const cachePhotos = () => {
        console.log('update photos in cache: ' + JSON.stringify(photos.value));
        Storage.set({
            key: PHOTO_STORAGE,
            value: JSON.stringify(photos.value),
        });
    };

    watch(photos, cachePhotos);

    const loadSaved = async () => {
        const photoList = await Storage.get({ key: PHOTO_STORAGE });
        const photosInStorage: Photo[] = photoList.value ? JSON.parse(photoList.value) : [];
        // web
        if (!isPlatform('hybrid')) {
            for (const photo of photosInStorage) {
                const file = await Filesystem.readFile({
                    path: photo.filepath,
                    directory: FilesystemDirectory.Data,
                });
                photo.webViewPath = `data:image/jpeg;base64,${file.data}`;
            }
        }

        photos.value = photosInStorage;
    };

    onMounted(loadSaved);

    const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });

    const savePicture = async (photo: CameraPhoto, fileName: string): Promise<Photo> => {
        let base64Data: string;
        // hybrid => iOS or Android
        if (isPlatform('hybrid')) {
            // eslint-disable-next-line
            const file = await Filesystem.readFile({ path: photo.path! });
            base64Data = file.data;
        } else {
            // web
            // eslint-disable-next-line
            const response = await fetch(photo.webPath!);
            const blob = await response.blob();
            base64Data = await convertBlobToBase64(blob) as string;
        }
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: FilesystemDirectory.Data,
        });

        if (isPlatform('hybrid')) {
            return {
                filepath: savedFile.uri,
                webViewPath: Capacitor.convertFileSrc(savedFile.uri),
            };
        } else {
            return {
                filepath: fileName,
                webViewPath: photo.webPath,
            };
        }
    };

    const takePhoto = async () => {
        const cameraPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });
        const fileName = new Date().getTime() + '.jpg';
        const savedFileImage = await savePicture(cameraPhoto, fileName);
        console.log('new photo', savedFileImage);
        photos.value = [savedFileImage, ...photos.value];
    };

    const deletePhoto = async (photo: Photo) => {
        // Remove this photo from the Photos reference data array
        photos.value = photos.value.filter(p => p.filepath !== photo.filepath);

        // delete photo file from filesystem
        const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') +1);
        await Filesystem.deleteFile({
            path:filename,
            directory: FilesystemDirectory.Data,
        });
    };

    return {
        photos,
        takePhoto,
        deletePhoto,
    };

}


export interface Photo {
    filepath: string;
    webViewPath?: string;
}
