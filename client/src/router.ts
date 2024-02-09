import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home/Home.vue";
import Auth from "./pages/Auth/Auth.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/register", component: Auth },
    { path: "/login", component: Auth },
  ],
});

export default router;
