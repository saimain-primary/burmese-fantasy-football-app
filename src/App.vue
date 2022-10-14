<template>
  <v-app>
    <v-dialog v-model="isLoading" persistent width="100">
      <v-card
        class="d-flex justify-center align-center"
        width="100"
        height="100"
      >
        <v-progress-circular
          :size="30"
          color="primary"
          indeterminate
        ></v-progress-circular
      ></v-card>
    </v-dialog>
    <TopBar :pageName="pageName" />
    <v-main class="my-auto">
      <router-view />
    </v-main>
    <Dialog></Dialog>
  </v-app>
</template>

<script>
import TopBar from "./components/TopBar.vue";
import Dialog from "./components/Dialog.vue";
import { mapActions, mapGetters } from "vuex";
import firebaseMessaging from "./firebase";
import { provide } from "vue";

export default {
  name: "App",
  components: { TopBar, Dialog },
  computed: {
    ...mapGetters({
      isLoading: "isLoading",
    }),
  },
  data: () => ({
    pageName: "",
  }),
  mounted() {},
  watch: {
    $route(to, from) {
      this.pageName = to.name;
    },
  },
  provide: {
    messaging: firebaseMessaging,
  },
};
</script>
