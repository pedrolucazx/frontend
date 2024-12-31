import type { RouteRecordRaw } from "vue-router";
import LoginView from "../views/LoginView.vue";
import PasswordRecoveryView from "../views/PasswordRecoveryView.vue";
import RegisterView from "../views/RegisterView.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "login", component: LoginView },
  { path: "/register", name: "register", component: RegisterView },
  {
    path: "/recover-password",
    name: "passwordRecovery",
    component: PasswordRecoveryView,
  },
];

export default routes;
