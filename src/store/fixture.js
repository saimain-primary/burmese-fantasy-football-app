import axios from "axios";

export default {
  namespaced: true,
  state: {
    fixtureList: [],
  },
  getters: {
    fixtureList(state) {
      return state.fixtureList;
    },
  },
  mutations: {
    storeFixtureList(state, fixtures) {
      state.fixtureList = fixtures;
    },
  },
  actions: {
    async getFixtureListAction({ commit, rootGetters }, data) {
      commit("toggleLoading", true, { root: true });

      let startDate = "";
      let endDate = "";
      if (data.week) {
        const gameWeekList = rootGetters["gameweek/gameWeekList"];
        const week = gameWeekList.filter((gw) => {
          return gw.week === data.week;
        })[0];
        startDate = week.startDate;
        endDate = week.endDate;
      } else {
        startDate = data.startDate;
        endDate = data.endDate;
      }
      const response = await axios.get("/fixture", {
        params: {
          from: startDate,
          to: endDate,
        },
      });
      commit("storeFixtureList", response.data.results.response);
      commit("toggleLoading", false, { root: true });
      console.log("response", response.data.results.response);
      return response.data;
    },
  },
};
