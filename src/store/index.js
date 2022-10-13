import { createStore } from "vuex";
import general from "./general";
import auth from "./auth";
import axios from "axios";

export default createStore({
  state: {
    isLoading: false,
    teams: [],
    verifyData: {
      phone: "",
      password: "",
    },
  },
  getters: {
    teams(state) {
      return state.teams;
    },
    isLoading(state) {
      return state.isLoading;
    },
    simpleTeams(state) {
      const teams = [];
      state.teams.map((t) => {
        teams.push(t.team.name);
      });
      return teams;
    },
    verifyData(state) {
      return state.verifyData;
    },
  },
  mutations: {
    setTeams(state, teams) {
      state.teams = teams;
    },
    toggleLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    storeVerifyData(state, data) {
      state.verifyData.phone = data.phone;
      state.verifyData.password = data.password;
    },
  },
  actions: {
    toggleLoading({ commit }, isLoading) {
      commit("toggleLoading", isLoading);
    },
    async getPremierLeagueTeamListAction({ commit }) {
      commit("toggleLoading", true);
      const response = await axios.get("/premier-league-teams");
      commit("toggleLoading", false);
      commit("setTeams", response.data.results.response);
    },
    async signupAccountAction({ commit }, data) {
      commit("toggleLoading", true);
      const response = await axios.post("/register", data);
      commit("toggleLoading", false);
      return response.data;
    },
    storeForVerifyAction({ commit }, data) {
      commit("storeVerifyData", data);
    },
  },
  modules: {
    general,
    auth,
  },
});
