import db from "../../firebase/initFirebase"
import {doc, getDoc} from "firebase/firestore";
export default {
  namespaced: true,
  state: {
    token: null,
    info: null,
  },
  getters: {
    isLoggedIn(state) {
      return state.token != null;
    },
    isArtist(state) {
      if (state.info) {
        return state.info.artist;
      }
      return false;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setInfo(state, info) {
      state.info = info;
    }
  },
  actions: {
    update({dispatch}, {user}) {
      if (user) {
        dispatch("updateToken", { token: user.uid });
      } else {
        dispatch("removeToken");
      }
    },
    async updateToken({ state, commit }, { token }) {
      localStorage.setItem("USER", token);
      commit("setToken", token);
      const docs = await getDoc(doc(db, "users", state.token));
      commit("setInfo",docs.data());
    },
    removeToken({ commit }) {
      localStorage.removeItem("USER");
      commit("setToken", null);
      commit("setInfo", null);
    },
  },
};
