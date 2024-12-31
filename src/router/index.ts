import type { RouteRecordRaw } from "vue-router";
import LoginView from "../views/LoginView.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "login", component: LoginView },
];

export default routes;
