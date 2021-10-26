import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import { initializeApp } from "firebase/firebase-app";
import { getFirestore } from "firebase/firebase-firestore-lite";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyA-NmIeD-S9GrHbxJwaJRJhlgGDtl61U5U",
  authDomain: "conectarte-3ed52.firebaseapp.com",
  projectId: "conectarte-3ed52",
  storageBucket: "conectarte-3ed52.appspot.com",
  messagingSenderId: "792600076862",
  appId: "1:792600076862:web:409ea72fc1e188c9f3276f",
  measurementId: "G-1GV9VBYM94"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
