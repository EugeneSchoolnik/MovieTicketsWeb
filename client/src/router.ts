import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home/Home.vue";
import Auth from "./pages/Auth/Auth.vue";
import RestorePass from "./pages/RestorePass/RestorePass.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/register", component: Auth },
    { path: "/login", component: Auth },
    { path: "/restorepass", component: RestorePass },
  ],
});

export default router;
