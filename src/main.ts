import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { IonIcon } from '@ionic/vue'
import { vfmPlugin } from 'vue-final-modal'
import './assets/main.css'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(vfmPlugin)

app.component('IonIcon', IonIcon)

app.mount('#app')
