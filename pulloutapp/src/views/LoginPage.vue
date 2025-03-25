<template>
    <ion-page>
        <ion-header>
        
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

<script setup="ts">

</script>


<style>

</style>