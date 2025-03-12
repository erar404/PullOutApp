<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Pull-Out</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <strong>Home to do</strong>
        <p>Saved scans</p>
        <p>Upload History</p>
        <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonTab, IonTabBar } from '@ionic/vue';
import { call, person, settings } from 'ionicons/icons';
import { axiosInstance } from '@/globalvars';
import { RxCollectionBase } from 'rxdb';
import { useDatabase } from '@/database';
import { defineComponent } from 'vue';


const onLoad = () => {
  const res = axiosInstance.get('/systemUser', {responseType: 'json'})
  const database = useDatabase();
  console.log(res)
}



// const resJson = JSON.stringify(res)
// // console.log(res)
// database.users.importJSON(resJson)
// // rxlocaldatabase.users.user.bulkUpsert(res).then(() => console.log('success')
// console.log(database.users)
                                                                    
// import { userCollection } from '@/models/user';

// console.log(dbDexie)
// console.log('test')

// const docs = userCollection.Users.find().exec();

// console.log(docs)



</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
