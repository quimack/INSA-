import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { IonIcon } from '@ionic/vue';
import { vfmPlugin } from 'vue-final-modal'

const app = createApp(App);
import './assets/main.css'
import {  firebaseApp } from './firebase'
import { VueFire, VueFireAuth } from 'vuefire'

app.use(router);
app.use(VueFire, {
    firebaseApp,
    modules: [
        // we will see other modules later on
        VueFireAuth(),
      ]
})
app.use(vfmPlugin)
app.component('IonIcon', IonIcon); // Registrar IonIcon como componente global

app.mount('#app')
