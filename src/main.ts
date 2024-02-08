import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { IonIcon } from '@ionic/vue'; // Importar IonIcon desde Ionic

const app = createApp(App);
import './assets/main.css'
import {  firebaseApp } from './firebase'
// import { createApp } from 'vue-demi'
import { VueFire, VueFireAuth } from 'vuefire'

app.use(router);
app.use(VueFire, {
    firebaseApp,
    modules: [
        // we will see other modules later on
        VueFireAuth(),
      ]
})
app.component('IonIcon', IonIcon); // Registrar IonIcon como componente global

app.mount('#app')
