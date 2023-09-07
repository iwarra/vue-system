import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import { createPinia } from "pinia";
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .use(mdiVue, {
    icons: mdijs
  })
  .mount('#app')
