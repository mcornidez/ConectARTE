<template>
<div id="nav">
<div class="d-flex align-center">
  <router-link to="/">
    <v-img
        alt="Logo ConectARTE"
        class="mr-2 pa-4"
        contain
        src="../assets/PageLogo.png"
        transition="scale-transition"
        width="250"
    />
  </router-link>
</div>
<div class="d-flex align-center">
  <v-btn
      :to="{name: 'Home'}"
      text
      class="btn">
    <span class="font">Inicio</span>
  </v-btn>
  <v-btn
      :to="{name: 'MyAgenda'} "
      text
      class="btn">
    <span class="font">Mi Agenda</span>
  </v-btn>
  <v-btn
      :to="{name: 'AddExposition'}"
      text
      class="btn">
    <span class="font">Registrá tu muestra</span>
  </v-btn>
  <v-btn
      :to="{name: 'Contact'}"
      text
      class="btn">
    <span class="font">Contactanos</span>
  </v-btn>
</div>

<v-spacer></v-spacer>

<div class="d-flex align-center">
  <v-btn
      :to="{name: 'Login'}"
      text
      class="btn">
    <v-icon style="color: white; font-size:35px;">mdi-account-outline</v-icon>
    <span class="font">Iniciar Sesión</span>
  </v-btn>
  <v-btn
      text
      class="btn"
      @click="logout">
    <span class="font">Cerrar Sesión</span>
  </v-btn>
</div>
</div>
</template>

<script>

import {signOut, getAuth} from "firebase/auth";
export default {
  name: "NavBar.vue",
  methods: {
    async logout() {
      const auth = getAuth();
      await signOut(auth);
      if (this.$route.path !== "/") {
        this.$router.push({name: 'Home'});
      }
    }
  }
}
</script>

<style scoped>
#nav {
  padding: 30px;
  height: 15vh;
  display: flex;
  background-color: black;
  position: fixed;
  width: 100%;
}
.btn {
  margin: 15px;
  background-color: transparent;
}
.font{
  color: white;
}
</style>