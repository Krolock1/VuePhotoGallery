<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="6" :key="photo" v-for="photo in photos">
            <ion-img :src="photo.webViewPath" @click="showActionSheet(photo)"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button @click="takePhoto()">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
    actionSheetController,
    IonPage,
    IonHeader,
    IonFab,
    IonFabButton,
    IonIcon,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol, IonImg,
} from '@ionic/vue';
import { camera, trash, close } from 'ionicons/icons';
import { Photo, usePhotoGallery } from '@/composable/usePhotoGallery';

export default  {
    name: 'Tab2',
    components: { IonPage, IonHeader, IonFab, IonFabButton, IonIcon,
    // eslint-disable-next-line vue/no-unused-components
        IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonImg },
    setup() {
        const { takePhoto, photos, deletePhoto } = usePhotoGallery();
        const showActionSheet = async (photo: Photo) => {
            console.log('showActionSheet');
            const actionSheet = await actionSheetController.create({
                header: 'Photos',
                buttons : [{
                    text: 'Delete',
                    role:'destructive',
                    icon: trash,
                    handler: () => {
                        deletePhoto(photo);
                    },
                },
                {
                    text:'Cancel',
                    icon: close,
                    role: 'cancel',
                    handler: () => {
                        console.log('cancel');
                    },
                },
                ],
            });
            await actionSheet.present();
        };
        return {
            takePhoto,
            photos,
            showActionSheet,
            camera,trash,close };
    },
};
</script>
