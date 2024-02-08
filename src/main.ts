import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { IonIcon } from '@ionic/vue'; // Importar IonIcon desde Ionic

const app = createApp(App);

app.use(router);
app.component('IonIcon', IonIcon); // Registrar IonIcon como componente global

app.mount('#app');
