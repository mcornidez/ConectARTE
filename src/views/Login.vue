<template>
  <div class="main">
    <div id="pageTitle">
      <br>
      <b>Iniciar Sesión</b>
    </div>
    <div class="form">
      <label for="username">Usuario</label>
      <br>
      <input required v-model="username" type="text" id="username" placeholder="Ingrese su usuario" class="input"/>
      <br>
      <label for="password">Contraseña</label>
      <br>
      <input required v-model="password" type="password" id="password" placeholder="Ingrese su contraseña" class="input"/>
      <br>
      <button @click="login" class="btn">Ingresar</button>
      <br>
      <br>
      <router-link :to="{name: 'ForgotUser'}">¿Olvidó su mail?</router-link>
      <br>
      <br>
      <router-link :to="{name: 'ForgotPassword'}">¿Olvidó su contraseña?</router-link>
      <br>
      <br>
      <label>¿No tiene cuenta? </label>
      <router-link :to="{name: 'Register'}">Regístrese</router-link>
      <br>
      <br>
      <label>¿Necesita ayuda? </label>
      <router-link :to="{name: 'Contact'}">Haga click aquí</router-link>
    </div>
  </div>
</template>

<script>

import store from '@/store'
export default {
  name: "Login",
  data(){
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    login() {
      store.user = this.username;
      this.$router.push({name: 'MyAgenda'});
    },
    logout() {
      store.user = null
    }
  },
}
</script>

<style scoped>

#pageTitle{
  font-size: xx-large;
  font-weight: lighter;
  color: black;
  height: 15vh;
  min-width: 30vw;
  max-width: 90vw;
  margin: auto;
  text-align: center;
}

.main{
  position:center;
  justify-content: center;
  background-image: url("../assets/FondoHome.png");
  background-size: cover;
  margin-top: 15vh;
  padding: 0;
  height:100vh;
  font-family: "Trebuchet MS", sans-serif;
}

.form{
  flex-direction: column;
  width: 30%;
  display: inline-block;
}

input{
  width: 80%;
  position: center;
}


</style>