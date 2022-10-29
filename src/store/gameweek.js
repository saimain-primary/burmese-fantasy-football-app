import axios from "axios";

export default {
  namespaced: true,
  state: {
    gameWeekList: [],
    gameWeekListForSelect: [],
    currentGameWeek: null,
    homePageGameWeek: null,
  },
  getters: {
    gameWeekList(state) {
      return state.gameWeekList;
    },
    gameWeekListForSelect(state) {
      return state.gameWeekListForSelect;
    },
    currentGameWeek(state) {
      return state.currentGameWeek;
    },
    homePageGameWeek(state) {
      return state.homePageGameWeek;
    },
  },
  mutations: {
    storeGameWeekList(state, gameWeek) {
      state.gameWeekList = gameWeek;
      state.gameWeekListForSelect = gameWeek.map((gw) => {
        return {
          name: gw.name,
          week: gw.week,
        };
      });
      state.currentGameWeek = gameWeek.filter((gw) => {
        return gw.isCurrent === true;
      })[0];
      state.homePageGameWeek = gameWeek.filter((gw) => {
        return gw.isHomePageCurrent === true;
      })[0];
    },
    storeCurrentGameWeek(state, current) {
      state.currentGameWeek = current;
    },
    storeHomePageGameWeek(state, homePageGameWeek) {
      state.homePageGameWeek = homePageGameWeek;
    },
  },
  actions: {
    async getCurrentGameWeekAction({ commit }, data) {
      commit("toggleLoading", true, { root: true });
      const response = await axios.get("/current-gameweek");
      commit("toggleLoading", false, { root: true });
      console.log("response", response.data);
      commit("storeCurrentGameWeek", response.data.results[0]);
      return response.data;
    },
    async getHomePageGameWeekAction({ commit }, data) {
      commit("toggleLoading", true, { root: true });
      const response = await axios.get("/home-gameweek");
      commit("toggleLoading", false, { root: true });
      console.log("response", response.data);
      commit("storeHomePageGameWeek", response.data.results[0]);
      return response.data;
    },
    async storeGameWeekAction({ commit }, data) {
      commit("toggleLoading", true, { root: true });
      const response = await axios.post("/gameweek", data);
      commit("toggleLoading", false, { root: true });
      return response.data;
    },
    async getGameWeekAction({ commit }) {
      // commit("toggleLoading", true, { root: true });
      const response = await axios.get("/gameweek");
      commit("storeGameWeekList", response.data.results);
      // commit("toggleLoading", false, { root: true });
      return response.data;
    },
    async changeCurrentGameWeekAction({ commit }, data) {
      commit("toggleLoading", true, { root: true });
      const response = await axios.post("/current-gameweek", data);
      commit("toggleLoading", false, { root: true });
      return response.data;
    },
    async changeHomePageGameWeekAction({ commit }, data) {
      commit("toggleLoading", true, { root: true });
      const response = await axios.post("/home-gameweek", data);
      commit("toggleLoading", false, { root: true });
      return response.data;
    },
  },
};
