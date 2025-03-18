<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="transluscent">
                <ion-title>Login</ion-title>
            </ion-toolbar>
            <ion-progress-bar type="indeterminate"></ion-progress-bar>
        </ion-header>
        <ion-content>
            <div id="img-container">
                <img src="./../../resources/icon-rgmc.png"/>
            </div>
            <div id="container">
                <p>
                    <ion-input label="Username" class="input-box"></ion-input>
                </p>
                <p> 
                    <ion-input label="Password" type="password" class="input-box"> 
                        <ion-input-password-toggle slot="end"> </ion-input-password-toggle>
                    </ion-input>
                </p>
                <p>
                    <ion-button>Login </ion-button>
                    <ion-button @click="goToHome('test')">Go to home</ion-button>
                </p>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonInput, IonInputPasswordToggle, IonAlert, IonButton, onIonViewDidEnter, alertController} from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { logoVenmo } from 'ionicons/icons';
import { useIonRouter } from "@ionic/vue";
import { axiosInstance } from '@/globalvars';
import { Storage } from '@ionic/storage';
import { useDatabase } from '@/database';

// const store = new Storage();
// await store.create();


onMounted(() => {
    const database = useDatabase();
    const userInstance = axiosInstance.get('/systemUser', {responseType: 'json'})
    const storeInstance = axiosInstance.get('/systemUser', {responseType: 'json'})

    userInstance.then(function (res) {
        // console.log(typeof(res.data))
        const data = res.data
        console.log('systemuser-start')
        data.forEach((row: any) => { 
            if (!database.users.findOne({selector: {secCode: { $eq: row.secCode}}}).exec()) {
                database.users.insert({
                    secCode: row.secCode,
                    typeCode: row.typeCode,
                    passWord: row.passWord,
                    expirationDate: row.expirationDate,
                    isActive: row.isActive
                })
            } 
        });
        console.log('loading end')
    }).catch(function (error) {
        // handle error
        console.log(error);
        presentAlert('Login', 'Error while loading user data', 'Error Details (Please send a screenshot)'+ error)
    })


})

const presentAlert = async (header: string, subHeader: string, message: string ) => {
    const alert = await alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  };


// const onLoad = async () => {
        
// }

// onIonViewDidEnter()

// const resJson = JSON.stringify(res)
// // console.log(res)
// database.users.importJSON(resJson)
// // rxlocaldatabase.users.user.bulkUpsert(res).then(() => console.log('success')
// console.log(database.users)

const ionRouter = useIonRouter();

const OnClick = async (text: any) => {
    console.log('clicked')
}


const goToHome = (session: any) => {
    // ionRouter.push({
    //     name: "session-detail",
    //     params: {sessionId: session.id.ToString}
    // })
    ionRouter.push("home")
}

</script>



<style>
.input-box {
    text-align: left;
}

#img-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 30%;
  transform: translateY(-50%);
  padding: 10pt 20pt 10pt 20pt
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  display: flex;
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}
#container a {
  text-decoration: none;
}

</style>