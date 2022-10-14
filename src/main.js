import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

import "./registerServiceWorker";

import firebaseMessaging from "./firebase";

const app = createApp(App);

app.config.globalProperties.$messaging = firebaseMessaging;

require("@/store/subscriber");

axios.defaults.baseURL =
  process.env.VUE_APP_PRODUCTION === "true"
    ? process.env.VUE_APP_PRODUCTION_API_BASE_URL
    : process.env.VUE_APP_API_BASE_URL;

loadFonts();

store.dispatch("auth/getMeAction", localStorage.getItem("token"));
Promise.all([]).finally(() => {
  createApp(App).use(router).use(store).use(vuetify).mount("#app");
});
