import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Authent from "../views/Authent.vue";

const routes = [
  { path: "/home", component: Home },
  { path: "/authent", component: Authent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
