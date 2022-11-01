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
    predictionResultList: [],
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
    predictionResultList(state) {
      return state.predictionResultList;
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
    setPredictionResultList(state, data) {
      state.predictionResultList = data;
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
    async getPredictionCalculatedListAction({ commit }, data) {
      console.log("d", data);
      const prediction_ids = data.predictions.map((p) => {
        return p._id;
      });

      const response = await axios.post("/calculate-point", {
        prediction_id: prediction_ids,
        user_id: data.user_id,
      });

      commit("setPredictionResultList", response.data.results);

      console.log("rsp", response);
    },
  },
};
