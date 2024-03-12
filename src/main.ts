import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import {Directives} from "@/plugins/directives";

const app = createApp(App)
app.use(createPinia()).use(Directives);

app.mount('#app')
