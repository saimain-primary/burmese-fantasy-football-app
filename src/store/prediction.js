import axios from "axios";

export default {
  namespaced: true,
  state: {
    isShowDialog: false,
    teams: { homeTeam: null, awayTeam: null },
    prediction: {
      homeTeamPrediction: 0,
      awayTeamPrediction: 0,
      useTwoXBooster: false,
      date: null,
    },
  },
  getters: {
    isShowDialog(state) {
      return state.isShowDialog;
    },
    prediction(state) {
      return state.prediction;
    },
    teams(state) {
      return state.teams;
    },
  },
  mutations: {
    toggleDialog(state, show) {
      state.isShowDialog = show;
    },
    setPrediction(state, prediction) {
      state.prediction = prediction;
    },
    setTeams(state, teams) {
      state.teams = teams;
    },
  },
  actions: {
    showPredictionDialog({ commit }, data) {
      commit("toggleDialog", data.show);
      commit("setTeams", data.teams);
      commit("setPrediction", data.prediction);
    },
    async savePredictionAction({ commit }, data) {
      const response = await axios.post("/predict", data);
      return response.data;
    },
  },
};
