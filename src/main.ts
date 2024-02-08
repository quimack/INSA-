import './assets/main.css'
import {  firebaseApp } from './firebase'
import { createApp } from 'vue-demi'
import App from './App.vue'
import router from './router'
import { VueFire, VueFireAuth } from 'vuefire'

const app = createApp(App)

app.use(router)
app.use(VueFire, {
    firebaseApp,
    modules: [
        // we will see other modules later on
        VueFireAuth(),
      ]
})

app.mount('#app')
