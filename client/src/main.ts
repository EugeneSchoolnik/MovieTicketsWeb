import { createApp } from "vue";
import VueSplide from "@splidejs/vue-splide";
import "./assets/styles/style.scss";
import App from "./App.vue";

const app = createApp(App);
app.use(VueSplide);
app.mount("#app");
