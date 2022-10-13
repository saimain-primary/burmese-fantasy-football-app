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
  },
  getters: {
    dialogData(state) {
      return state.dialogData;
    },
    regions(state) {
      return state.regions;
    },
  },
  mutations: {},
  actions: {
    showDialogAction({ state }, data) {
      state.dialogData.show = true;
      state.dialogData.persistent = data.persistent ? data.persistent : true;
      state.dialogData.title = data.title;
      state.dialogData.body = data.body;
      state.dialogData.list = data.list ? data.list : null;
      state.dialogData.link = data.link ? data.link : null;
      state.dialogData.linkText = data.linkText;
      state.dialogData.close = data.close ? data.close : true;
    },
  },
  modules: {},
};
