import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import axios from "axios";

import "./registerServiceWorker";

require("@/store/subscriber");

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.VUE_APP_PRODUCTION_API_BASE_URL
    : process.env.VUE_APP_API_BASE_URL;

loadFonts();

Promise.all([
  store.dispatch("auth/getMeAction", localStorage.getItem("token")),
]).finally(() => {
  createApp(App).use(router).use(store).use(vuetify).mount("#app");
});
