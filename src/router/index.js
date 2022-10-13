import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Tournament from "../views/Tournament.vue";
import Leaderboard from "../views/Leaderboard.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Verify from "../views/Verify.vue";
import ResetPassword from "../views/ResetPassword.vue";
import ChangePassword from "../views/ChangePassword.vue";
import ManageGameWeek from "../views/ManageGameWeek.vue";
import store from "@/store";
const routes = [
  {
    path: "/",
    name: "Burmese Fantasy Football",
    component: Home,
  },
  {
    path: "/tournament",
    name: "tournament",
    component: Tournament,
  },
  {
    path: "/leaderboard",
    name: "leaderboard",
    component: Leaderboard,
  },
  {
    path: "/profile",
    name: "my profile",
    component: Profile,
  },
  {
    path: "/signup",
    name: "sign up new account",
    component: Signup,
  },
  {
    path: "/login",
    name: "login to account",
    component: Login,
  },
  {
    path: "/verify",
    name: "verify phone number",
    component: Verify,
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    component: ResetPassword,
  },
  {
    path: "/change-password",
    name: "Change Password",
    component: ChangePassword,
  },
  {
    path: "/manage-gw",
    name: "Manage Game Week",
    component: ManageGameWeek,
    // beforeEnter: (to, from, next) => {
    //   console.log("middleware", store.getters["auth/authenticated"]);
    //   console.log("middleware", store.getters["auth/user"]);
    //   if (
    //     store.getters["auth/authenticated"] &&
    //     store.getters["auth/user"] === true
    //   ) {
    //     console.log("redice");
    //     return next({
    //       name: "Profile",
    //     });
    //   }
    //   next();
    // },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
