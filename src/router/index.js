import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Signup from "../views/SignUpHere.vue";
import Login from "../views/Login.vue";
import TodoDetail from "@/views/TodoDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/todo/:id",
      name: "todo",
      component: TodoDetail,
    },
  ],
});

export default router;
