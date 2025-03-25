<template>
    <ion-page>
        <ion-header>
            <!-- <ion-toolbar color="transluscent">
                <ion-title>Login</ion-title>
            </ion-toolbar> -->
            <!-- <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar> -->
            <!-- <ion-loading> </ion-loading> -->
            

        </ion-header>
        <ion-content>
            <div id="img-container">
                <img src="./../../resources/icon-rgmc.png"/>
            </div>
            <div id="container">
                <p>
                    <ion-input label="Username" class="input-box" v-model="username"></ion-input>
                </p>
                <p> 
                    <ion-input label="Password" type="password" class="input-box" v-model="password"> 
                        <ion-input-password-toggle slot="end"> </ion-input-password-toggle>
                    </ion-input>
                </p>
                <p>
                    <ion-button @click="loginAuthenticate">Login </ion-button>
                    <ion-button href="/home">Go to home</ion-button>
                </p>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { 
    IonInput, 
    IonInputPasswordToggle, 
    IonButton, 
    alertController, 
    loadingController,
    IonPage,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonProgressBar
} from '@ionic/vue';
import { onMounted, ref } from 'vue';
import { useIonRouter } from "@ionic/vue";
import { axiosInstance } from '@/globalvars';
import { useDatabase } from '@/database';
import { RxUserDocument } from '@/RxDB';
import { tap } from 'rxjs/operators';

// import { Storage } from '@ionic/storage';
// const store = new Storage();
// await store.create();
var isLoading = ref(true);
const username = ref("");
const password = ref("");
const database = useDatabase();
const systemUsers =  ref<any[]>([]);


onMounted(async () => {
    const userInstance = axiosInstance.get('/systemUser', {responseType: 'json'})
    const loading = await loadingController.create({
        message: 'Loading Data. Internet Connection Needed...',
    });
    
    const customerInstance = axiosInstance.get('/customer ', {responseType: 'json'})

    loading.present()
    // ---- start data loading from api -----
    userInstance.then(function (res) {
        const data = res.data
        console.log('systemuser-start')
        data.forEach((row: any) => { 
            if (!database.users.findOne({selector: {secCode: { $eq: row.secCode}}}).exec()) {
                database.users.insert({
                    secCode: row.secCode,
                    typeCode: row.typeCode,
                    passWord: row.passWord,
                    passwordEncrypted: row.passwordEncrypted,
                    expirationDate: row.expirationDate,
                    isActive: row.isActive
                })
            } 
        });
    }).catch(function (error) {
        // handle error
        presentAlert('Login', 'Error while loading user data', 'Error Details (Please send a screenshot): '+ error)
    })

    

    // ---- end loading data from api -----
    isLoading.value = false;
    console.log('loading done')
    loading.dismiss();
    
})

const loginAuthenticate = async (username: string, password: string) => {
    database.users.find({
        selector: {},
        // sort: [{secCode: 'asc'}]
    }).$.pipe(
        tap(() => {
          // debounce to simulate slow load
          setTimeout(() => (isLoading.value = false), 1000);
        })
      ).subscribe((result: RxUserDocument[]) => {
        console.log(result)
        systemUsers.value = result;
    })

} 

const showLoading = async () => {
    const loading = await loadingController.create({
        message: 'Loading Data. Internet Connection Needed...',
    });

    loading.present()
}

const presentAlert = async (header: string, subHeader: string, message: string ) => {
    const alert = await alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
};

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