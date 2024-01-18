import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { ref, provide } from "vue";

const pinia = createPinia();

createApp(App)
	.use(pinia)
	.use(router)
	.provide("customer", ref({}))
	.mount("#app");
