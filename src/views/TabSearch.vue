<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Suche</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Suche</ion-title>
        </ion-toolbar>
      </ion-header>
<ion-card class="quickSearch">
  <ion-card-content>
      <ion-list>
        <ion-item>
          <ion-icon :icon="searchOutline"></ion-icon>
          <ion-input v-model="destination" placeholder="Ort oder Hotel"></ion-input>
        </ion-item>
        <ion-item>
          <ion-icon :icon="calendarOutline" placeholder="Startdatum"></ion-icon>
          <ion-datetime display-format="DD.MM.YYYY"
                        min="1970-01-01"
                        max="2022-12-31"
                        :value="startDate"
                        @ionChange="updateStartDate">
          </ion-datetime>
        </ion-item>
        <ion-item>
          <ion-icon :icon="calendarClearOutline"></ion-icon>
          <ion-input type="number" v-model="duration" placeholder="Übernachtungen"></ion-input>
        </ion-item>
        <ion-item>
          <ion-icon :icon="peopleOutline"></ion-icon>
          <ion-input type="number" v-model="peopleCount" placeholder="Anzahl Personen"></ion-input>
        </ion-item>
      </ion-list>
    <ion-button color="primary" @click="runSearch">Suchen</ion-button>
  </ion-card-content>
</ion-card>
      <ion-card>
        <ion-card-header>Eingaben</ion-card-header>
        <ion-card-content>
      <ion-list>
        <ion-item>
          <ion-label>Ort</ion-label>
          <ion-label>{{destination}}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Start</ion-label>
          <ion-label>{{startDate}}</ion-label>
        </ion-item>
        <ion-item>
            <ion-label>Übernachtungen</ion-label>
            <ion-label>{{duration}}</ion-label>
        </ion-item>
        <ion-item>
            <ion-label>Anzahl</ion-label>
            <ion-label>{{peopleCount}}</ion-label>
        </ion-item>
      </ion-list>

      </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonItem, IonIcon, IonButton, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonLabel,IonList, IonInput, IonDatetime } from '@ionic/vue';
import { peopleOutline, searchOutline, calendarOutline, calendarClearOutline } from 'ionicons/icons';

export default  {
    name: 'TabSearch',
    components: { IonItem, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, IonLabel, IonList, IonInput, IonDatetime },
    props:{

    },
    data() {
        return {
            destination: 'Barcelona',
            peopleCount: 3,
            duration: 2,
            startDate: new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()).toISOString(),
        };
    },
    methods: {
        runSearch() {
            console.log(`run search with ${this.destination} and ${this.peopleCount} and start date = ${this.startDate}`);
        },
        updateStartDate($event) {
            console.log('detail',$event.detail.value);
            this.startDate = $event.target.value;
        },
    },
    setup() {
        return {
            calendarOutline,
            searchOutline,
            peopleOutline,
            calendarClearOutline,

        };
    },
};
</script>

<style>


.quickSearch ion-icon {
  color: #3dc2ff;
  margin-right: 10px;
}

</style>
