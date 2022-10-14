import axios from "axios";

export default {
  namespaced: true,
  state: {
    gameWeekList: [],
    currentGameWeek: null,
  },
  getters: {
    gameWeekList(state) {
      return state.gameWeekList;
    },
    currentGameWeek(state) {
      return state.currentGameWeek;
    },
  },
  mutations: {
    storeGameWeekList(state, gameWeek) {
      state.gameWeekList = gameWeek;
    },
  },
  actions: {
    async storeGameWeekAction({ commit }, data) {
      commit("toggleLoading", true, { root: true });
      const response = await axios.post("/gameweek", data);
      commit("toggleLoading", false, { root: true });
      return response.data;
    },
    async getGameWeekAction({ commit }) {
      commit("toggleLoading", true, { root: true });
      const response = await axios.get("/gameweek");
      commit("storeGameWeekList", response.data.results);
      commit("toggleLoading", false, { root: true });
      return response.data;
    },
  },
};
