import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Tournament from '../views/Tournament.vue';
import Leaderboard from '../views/Leaderboard.vue';
import Profile from '../views/Profile.vue';
import EditProfile from '../views/EditProfile.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Verify from '../views/Verify.vue';
import ResetPassword from '../views/ResetPassword.vue';
import ChangePassword from '../views/ChangePassword.vue';
import FixtureDetail from '../views/FixtureDetail.vue';
import ManageGameWeek from '../views/ManageGameWeek.vue';
import Lineups from '../views/Lineups.vue';
import Lineups2 from '../views/Lineups2.vue';
import LeaderboardDetail from '../views/LeaderboardDetail.vue';
import store from '@/store';
const routes = [
  {
    path: '/',
    name: 'Burmese Fantasy Football',
    component: Home,
  },
  {
    path: '/tournament',
    name: 'tournament',
    component: Tournament,
  },
  {
    path: '/fixture/:id',
    name: 'Match Details',
    component: FixtureDetail,
    props: true,
    meta: { back: true },
  },
  // {
  //   path: '/lineups',
  //   name: 'Line Ups',
  //   component: Lineups,
  //   meta: { back: true },
  // },
  {
    path: '/lineups',
    name: 'Line Ups 2',
    component: Lineups2,
    meta: { back: true },
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: Leaderboard,
  },
  {
    path: '/leaderboard/:id',
    name: 'Leaderboard Detail',
    component: LeaderboardDetail,
    props: true,
    meta: { back: true },
  },
  {
    path: '/profile',
    name: 'my profile',
    component: Profile,
  },
  {
    path: '/profile/edit',
    name: 'edit profile',
    component: EditProfile,
    props: true,
    meta: { back: true },
    beforeEnter: (to, from, next) => {
      let user = store.getters['auth/user'];
      if (user) {
        if (!store.getters['auth/authenticated']) {
          return next({
            path: '/profile',
          });
        }
        next();
      } else {
        return next({
          path: '/profile',
        });
      }
    },
  },
  {
    path: '/signup',
    name: 'sign up new account',
    component: Signup,
  },
  {
    path: '/login',
    name: 'login to account',
    component: Login,
  },
  {
    path: '/verify',
    name: 'verify phone number',
    component: Verify,
  },
  {
    path: '/reset-password',
    name: 'Reset Password',
    component: ResetPassword,
  },
  {
    path: '/change-password',
    name: 'Change Password',
    component: ChangePassword,
  },
  {
    path: '/manage-gw',
    name: 'Manage Game Week',
    component: ManageGameWeek,
    beforeEnter: (to, from, next) => {
      let user = store.getters['auth/user'];
      if (user) {
        if (!store.getters['auth/authenticated'] && !user.isAdmin) {
          return next({
            path: '/',
          });
        }
        next();
      } else {
        return next({
          path: '/',
        });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
