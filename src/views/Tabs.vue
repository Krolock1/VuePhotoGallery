<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="search" href="/tabs/search">
          <ion-icon :icon="search" />
          <ion-label>Suche</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="list" href="/tabs/list">
          <ion-icon :icon="list" />
          <ion-label>Hotels</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="photos" href="/tabs/photos">
          <ion-icon :icon="images" />
          <ion-label>Photos</ion-label>
        </ion-tab-button>


      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { square, triangle, images, search, list  } from 'ionicons/icons';

export default {
    name: 'Tabs',
    components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
    setup() {
        return {
            images,
            square,
            search,
            list,
            triangle,
        };
    },
};
</script>
