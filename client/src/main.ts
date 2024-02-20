import { createApp } from "vue";
import VueSplide from "@splidejs/vue-splide";
import router from "./router";
import store from "./store";
import "./assets/styles/style.scss";
import App from "./App.vue";

const app = createApp(App);
app.use(VueSplide);
app.use(router);
app.use(store);
app.mount("#app");
