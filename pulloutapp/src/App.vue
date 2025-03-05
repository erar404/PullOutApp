<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { SplashScreen } from '@capacitor/splash-screen';

// await SplashScreen.hide();

// await SplashScreen.show({
//   autoHide: false
// })

// await SplashScreen.show({
//   showDuration: 2000,
//   autoHide: true
// })

</script>

