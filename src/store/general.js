export default {
  namespaced: true,
  state: {
    regions: [
      "Ayeyarwady",
      "Bago",
      "Chin",
      "Kachin",
      "Kayah",
      "Kayin",
      "Magway",
      "Mandalay",
      "Mon",
      "Naypyidaw",
      "Rakhine",
      "Sagain",
      "Shan",
      "Tanintharyi",
      "Yangon",
    ],
    dialogData: {
      show: false,
      link: null,
      linkText: "",
      persistent: true,
      title: "",
      body: "",
      list: null,
      close: true,
    },
    snackBar: {
      show: false,
      text: "",
      close: true,
    },
  },
  getters: {
    dialogData(state) {
      return state.dialogData;
    },
    snackBar(state) {
      return state.snackBar;
    },
    regions(state) {
      return state.regions;
    },
  },
  mutations: {},
  actions: {
    showDialogAction({ state }, data) {
      console.log("data for dialog", data);
      state.dialogData.show = true;
      state.dialogData.persistent = data.persistent ? data.persistent : true;
      state.dialogData.title = data.title;
      state.dialogData.body = data.body;
      state.dialogData.list = data.list ? data.list : null;
      state.dialogData.link = data.link ? data.link : null;
      state.dialogData.linkText = data.linkText;
      state.dialogData.close = data.close ? data.close : true;
    },
    closeDialogAction({ state }) {
      state.dialogData.show = false;
      state.dialogData.link = null;
      state.dialogData.linkText = "";
      state.dialogData.persistent = true;
      state.dialogData.title = "";
      state.dialogData.body = "";
      state.dialogData.list = null;
      state.dialogData.close = true;
    },
    toggleSnackBarAction({ state }, data) {
      if (!data.show) {
        state.snackBar.show = false;
        state.snackBar.text = "";
        state.snackBar.close = true;
      } else {
        state.snackBar.show = true;
        state.snackBar.text = data.text;
        state.snackBar.close = data.close;
      }
    },
  },
  modules: {},
};
