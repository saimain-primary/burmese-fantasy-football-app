import axios from "axios";
export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
    favoriteTeam: null,
  },
  getters: {
    authenticated(state) {
      return state.token && state.user ? true : false;
    },
    user(state) {
      return state.user;
    },
    favoriteTeam(state) {
      return state.favoriteTeam;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    setFavoriteTeam(state, team) {
      state.favoriteTeam = team;
    },
  },
  actions: {
    async loginAccountAction({ commit, dispatch }, data) {
      commit("toggleLoading", true, { root: true });
      const response = await axios.post("/login", data);
      if (response.data.code !== 200) {
        commit("toggleLoading", false, { root: true });
        return response.data;
      } else {
        return dispatch("getMeAction", response.data.results.token);
      }
    },

    async getMeAction({ commit, state, dispatch }, token) {
      if (token) {
        commit("setToken", token);
        // commit("toggleLoading", true, { root: true });
      }

      if (!state.token) {
        return;
      }

      try {
        const response = await axios.get("/me");
        commit("setUser", response.data.results);

        // if (!state.favoriteTeam) {
        //   const teamResponse = await axios.get("/teams", {
        //     params: {
        //       name: response.data.results.favoriteTeam,
        //     },
        //   });

        //   commit("setFavoriteTeam", teamResponse.data.results.response[0]);
        // }

        commit("toggleLoading", false, { root: true });
        return response.data;
      } catch (error) {
        commit("setToken", null);
        commit("setUser", null);
        commit("setFavoriteTeam", null);
        commit("toggleLoading", false, { root: true });
      }
    },

    async verifyAccountAction({ commit, dispatch }, data) {
      try {
        commit("toggleLoading", true, { root: true });
        const response = await axios.post("/verify-otp", data);

        if (response.data.code !== 200) {
          commit("toggleLoading", false, { root: true });
          return response.data;
        } else {
          return dispatch("getMeAction", response.data.results.token);
        }
      } catch (error) {
        commit("toggleLoading", false, { root: true });
      }
    },

    logoutAction({ commit }) {
      localStorage.removeItem("token");
      commit("setToken", null);
      commit("setUser", null);
      commit("setFavoriteTeam", null);
    },
  },
};
