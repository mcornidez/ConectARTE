<template>
    <v-app>
      <v-content>
        <div id="app">
        <NavBar/>
      </div>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  import NavBar from './components/NavBar';
  export default {
    name: 'App',
    components: {
      NavBar
    },
    data: () => ({
    //
    }),
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
  font-size: 16px;
}
</style>
