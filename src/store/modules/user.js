export default {
  namespaced: true,
  state: {
    token: null,
  },
  getters: {
    isLoggedIn(state) {
      return state.token != null;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    update({dispatch}, {user}) {
      if (user) {
        dispatch("updateToken", { token: user.email });
      } else {
        dispatch("removeToken");
      }
    },
    updateToken({ commit }, { token }) {
      localStorage.setItem("USER", token);
      commit("setToken", token);
    },
    removeToken({ commit }) {
      localStorage.removeItem("USER");
      commit("setToken", null);
    },
  },
};
