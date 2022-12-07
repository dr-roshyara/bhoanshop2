import "@/css/index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
// import "@/assets/base.css";
// import "@/assets/main.css";

import App from "@/App.vue";
import router from "@/router";

import "@/assets/main.css";
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");