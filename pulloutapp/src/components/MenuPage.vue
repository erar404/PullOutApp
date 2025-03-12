<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="home" href="/home">
                    <ion-icon :icon="homeOutline"/>
                    <ion-label>Home</ion-label>
                </ion-tab-button>
                <ion-tab-button tab="history" href="/saved">
                    <ion-icon :icon="timeOutline"/>
                    <ion-label>Scans</ion-label>
                </ion-tab-button>
                <ion-tab-button tab="account" href="/account">
                    <ion-icon :icon="personOutline"/>
                    <ion-label>Account</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle, homeOutline, timeOutline, personOutline } from 'ionicons/icons';

// export default {
//     components: {IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon},
//     data() {
//         return {
//             homeOutline,
//             timeOutline
//             personOutline
//         }
//     }
// }
</script>

