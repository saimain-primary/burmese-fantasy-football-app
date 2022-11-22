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
    homeData: null,
    leaderboardData: null,
    isLoading: false,
    teams: null,
    verifyData: {
      phone: "",
      password: "",
    },
    leaderboardDetail: null,
    leagues: null,
    leagueDetail: null
  },
  getters: {
    teams(state) {
      return state.teams;
    },
    isLoading(state) {
      return state.isLoading;
    },
    simpleTeams(state) {
      if (state.teams) {
        const teams = [];
        state.teams.map((t) => {
          teams.push(t.team.name);
        });
        return teams;
      }
    },
    verifyData(state) {
      return state.verifyData;
    },
    tournamentData(state) {
      return state.tournamentData;
    },
    leaderboardData(state) {
      return state.leaderboardData;
    },
    homeData(state) {
      return state.homeData;
    },
    leaderboardDetail(state) {
      return state.leaderboardDetail;
    },
    leagues(state) {
      return state.leagues;
    },
    leagueDetail(state) {
      return state.leagueDetail;
    }
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
    setLeaderboardData(state, data) {
      state.leaderboardData = data;
    },
    setHomeData(state, data) {
      state.homeData = data;
    },
    setLeaderboardDetail(state, data) {
      state.leaderboardDetail = data;
    },
    setLeagues(state, data) {
      state.leagues = data;
    },
    setLeagueDetail(state, data) {
      state.leagueDetail = data;
    }
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
      const response = await axios.get("/tournament-custom", {
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

    async getLeaderboardDataAction({ commit }, query) {
      const response = await axios.get("/leaderboard", {
        params: query,
      });

      commit("setLeaderboardData", response.data.results);
      console.log(response);

      return response.data;
    },

    async getHomeDataAction({ commit }, query) {
      const response = await axios.get("/home", {
        params: query,
      });

      commit("setHomeData", response.data.results);
      console.log(response);

      return response.data;
    },

    async updateAccountAction({ commit }, data) {
      commit("toggleLoading", true);

      const response = await axios.put("/me", data);
      commit("auth/setUser", response.data.results, { root: true });

      return response.data;
    },

    async getLeaderboardDetailAction({ commit }, data) {
      const response = await axios.get("/leaderboard-detail/" + data.user_id, {
        params: {
          fixture_week: data.fixture_week,
          league_id: data.league_id
        },
      });

      commit("setLeaderboardDetail", response.data.results);

      return response.data;
    },

    async getLeaguesAction({commit},params) {
      const response = await axios.get("/leagues");
      commit("setLeagues", response.data.results);
      return response.data;
    },

    async getLeagueDetailAction({ commit }, id) {
      const response = await axios.get('/leagues/' + id);
      commit("setLeagueDetail", response.data.results);
      return response.data;
    }
  },
  modules: {
    gameweek,
    fixture,
    general,
    auth,
    prediction,
  },
});
