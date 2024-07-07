import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import Button from "primevue/button"


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('Button', Button);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(Toast);
app.use(createPinia())
app.use(router)



app.mount('#app')
