import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/home/index.vue";
import About from "../views/about/index.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
