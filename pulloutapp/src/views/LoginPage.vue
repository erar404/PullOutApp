<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="transluscent">
                <ion-title>Login</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div id="img-container">
                <img src="./../../resources/icon-rgmc.png"/>
            </div>
            <div id="container">
                <p>
                    <ion-input label="Username"></ion-input>
                </p>
                <p> 
                    <ion-input label="Password" type="password"> 
                        <ion-input-password-toggle slot="end"> </ion-input-password-toggle>
                    </ion-input>
                </p>
                <p>
                    <ion-button>Login </ion-button>
                </p>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonInput, IonInputPasswordToggle, IonAlert, IonButton } from '@ionic/vue';


</script>



<style>
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