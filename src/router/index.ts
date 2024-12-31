import type { RouteRecordRaw } from "vue-router";
import LoginView from "../views/LoginView.vue";
import PasswordRecoveryView from "../views/PasswordRecoveryView.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "login", component: LoginView },
  {
    path: "/recover-password",
    name: "passwordRecovery",
    component: PasswordRecoveryView,
  },
];

export default routes;
