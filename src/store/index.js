import { createStore } from "vuex";
import general from "./general";
import auth from "./auth";
import gameweek from "./gameweek";
import fixture from "./fixture";
import prediction from "./prediction";
import axios from "axios";

export default createStore({
  state: {
    tournamentData: {
      predictions: null,
      fixtures: null,
    },
    isLoading: false,
    teams: null,
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
    tournamentData(state) {
      return state.tournamentData;
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
    storeTournamentData(state, data) {
      console.log(data);
      state.tournamentData.fixtures = data.fixtures ? data.fixtures : null;
      state.tournamentData.predictions = data.predictions
        ? data.predictions
        : null;
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

    setTeamsAction({ commit }, data) {
      commit("setTeams", data);
    },

    async getTournamentIndexAction({ commit }, query) {
      // commit("toggleLoading", true);
      console.log("q", query);
      const response = await axios.get("/tournament", {
        params: query,
      });

      if (query.fixture_id) {
        commit("fixture/storeFixtureDetail", response.data.results, {
          root: true,
        });
      } else {
        commit("storeTournamentData", response.data.results);
      }

      // commit("toggleLoading", false);

      return response.data;
    },
  },
  modules: {
    gameweek,
    fixture,
    general,
    auth,
    prediction,
  },
});
