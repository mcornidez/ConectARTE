import db from "../../firebase/initFirebase"
import {doc, getDoc} from "firebase/firestore";
export default {
  namespaced: true,
  state: {
    token: null,
    info: null,
    artist: null,
  },
  getters: {
    isLoggedIn(state) {
      return state.token != null;
    },
    isArtist(state) {
      return state.artist;
    },
    getId(state) {
      return state.token;
    },
    getName(state) {
      return state.info.displayName;
    },
    getEmail(state) {
      return state.info.email;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setInfo(state, info) {
      state.info = info;
    },
    setArtist(state, artist) {
      state.artist = artist;
    }
  },
  actions: {
    update({dispatch}, {user}) {
      if (user) {
        dispatch("updateToken", { user: user });
      } else {
        dispatch("removeToken");
      }
    },
    async updateToken({ commit }, { user }) {
      localStorage.setItem("USER", user.uid);
      const docs = await getDoc(doc(db, "users", user.uid));
      commit("setInfo", user);
      commit("setArtist", docs.data().artist);
      commit("setToken", user.uid);
    },
    removeToken({ commit }) {
      localStorage.removeItem("USER");
      commit("setToken", null);
      commit("setInfo", null);
      commit("setArtist", null);
    },
  },
};
