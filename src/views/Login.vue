<template>
  <div class="main">
    <div id="pageTitle">
      <br>
      <b>Iniciar Sesión</b>
    </div>
    <div class="form">
      <label for="username">Mail</label>
      <br>
      <input required v-model="email" type="text" id="username" placeholder="Ingrese su mail" class="input"/>
      <br>
      <label for="password">Contraseña</label>
      <br>
      <input required v-model="password" type="password" id="password" placeholder="Ingrese su contraseña" class="input"/>
      <br>
      <v-btn dark @click="login" class="btn">Ingresar</v-btn>
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
import {signInWithEmailAndPassword, getAuth} from "firebase/auth";

export default {
  name: "Login",
  data(){
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    async login() {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, this.email, this.password).then(this.$router.push({name: 'MyAgenda'}))
          .catch(error => {
            alert("Mail o contraseña inválidos");
            this.error = error;
          })
    },
  },
}
</script>

<style scoped>

#pageTitle{
  font-size: x-large;
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
  background-attachment: fixed;
  margin-top: 10vh;
  padding: 0;
  height:100vh;
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