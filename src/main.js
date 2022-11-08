import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import axios from "axios";
import VueGtag from "vue-gtag";
import VueHotjar from 'vue-hotjar-next'


import "./registerServiceWorker";

require("@/store/subscriber");

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.VUE_APP_PRODUCTION_API_BASE_URL
    : process.env.VUE_APP_API_BASE_URL;

loadFonts();

Promise.all([
  store.dispatch("auth/getMeAction", localStorage.getItem("token"))
]).finally(() => {
  createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(VueGtag, {
    config: { id: "G-PJJCRGQ8Z5" },
    router,
  }).use(VueHotjar, {
    id: 3112019,
    isProduction: true,
    snippetVersion: 6
  })
  .mount("#app");

})
