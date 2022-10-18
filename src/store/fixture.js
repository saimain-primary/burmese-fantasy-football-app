import axios from "axios";

export default {
  namespaced: true,
  state: {
    fixtureList: [],
    venueDetail: null,
    fixtureDetail: null,
    selectedGameWeek: null,
  },
  getters: {
    fixtureList(state) {
      return state.fixtureList;
    },
    venueDetail(state) {
      return state.venueDetail;
    },
    fixtureDetail(state) {
      return state.fixtureDetail;
    },
    selectedGameWeek(state) {
      return state.selectedGameWeek;
    },
  },
  mutations: {
    storeFixtureList(state, fixtures) {
      state.fixtureList = fixtures;
    },

    storeVenuesDetail(state, venue) {
      state.venueDetail = venue;
    },

    storeFixtureDetail(state, fixture) {
      state.fixtureDetail = fixture;
    },

    storeSelectedGameWeek(state, gameweek) {
      state.selectedGameWeek = gameweek;
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

    async getFixtureDetail({ commit, dispatch }, id) {
      commit("toggleLoading", true, { root: true });
      const response = await axios.get("/fixture", {
        params: {
          id: id,
        },
      });

      dispatch(
        "getVenuesDetail",
        response.data.results.response[0].fixture.venue.id
      );

      commit("storeFixtureDetail", response.data.results.response[0]);
      commit("toggleLoading", false, { root: true });
      return response.data;
    },

    async getVenuesDetail({ commit }, id) {
      const response = await axios.get("/venues", {
        params: {
          id: id,
        },
      });
      commit("storeVenuesDetail", response.data.results.response[0]);
    },

    storeSelectedGameWeekAction({ commit }, gameweek) {
      commit("storeSelectedGameWeek", gameweek);
    },
  },
};
