<template>
    <v-app>
      <v-main>
        <NavBar/>
        <div id="app">
        </div>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import db from "./firebase/initFirebase";
import NavBar from './components/NavBar';
import {getAuth, onAuthStateChanged} from "firebase/auth";
export default {
  db,
  name: 'App',
  components: {
    NavBar,
  },
  beforeCreate() {
    onAuthStateChanged(getAuth(), user => {
      this.$store.dispatch("user/update", {user: user});
    });
  },
};
</script>

<style lang="scss">

#app {
  font-family: "Trebuchet MS", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

.input {
  background-color: white;
  opacity: 0.7;
  width: 80%;
  border: 1px solid #2c3e50;
  padding: 10px;
  margin-bottom: 20px;
  position: center;
}

.btn {
  background-color: black;
  color: white;
  padding: 10px;
  font-size: 14px;
}
</style>



