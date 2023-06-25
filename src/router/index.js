import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/components/layout/index.vue";
import Home from "../views/home/index.vue";
import About from "../views/about/index.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    meta: { title: "概览" },
    name: "home",
    children: [
      {
        path: "home",
        component: Home,
        name: "概览",
      },
    ],
  },
  { path: "/about", component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
