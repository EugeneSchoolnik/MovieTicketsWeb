import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home/Home.vue";
import Auth from "./pages/Auth/Auth.vue";
import RestorePass from "./pages/RestorePass/RestorePass.vue";
import Profile from "./pages/Profile/Profile.vue";
import Movies from "./pages/Movies/Movies.vue";
import Manage from "./pages/Admin/Manage.vue";
import MovieForm from "./pages/Admin/MovieForm/MovieForm.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/register", component: Auth },
    { path: "/login", component: Auth },
    { path: "/restorepass", component: RestorePass },
    { path: "/profile", component: Profile },
    { path: "/movies", component: Movies },
    { path: "/admin", component: Manage },
    { path: "/admin/new", component: MovieForm },
    { path: "/admin/edit", component: MovieForm },
  ],
});

export default router;
