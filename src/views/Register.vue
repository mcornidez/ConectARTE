<template>
  <div class="main">
    <div id="pageTitle">
      <br>
      <b>Register</b>
    </div>
    <div class="form">
      <label for="name">Ingrese su nombre: </label>
      <input required v-model="name" type="text" id="name" class="input" placeholder="Ingrese su nombre"/>
      <br>
      <label for="surname">Ingrese su apellido: </label>
      <input required v-model="surname" type="text" id="surname" class="input" placeholder="Ingrese su apellido"/>
      <br>
      <label for="mail">Ingrese su mail: </label>
      <input required v-model="mail" type="email" id="mail" class="input" placeholder="Ingrese su mail"/>
      <br>
      <label for="password">Ingrese una contraseña: </label>
      <input required v-model="password" type="password" id="password" class="input" placeholder="Ingrese una contraseña"/>
      <br>
      <label for="user">Ingrese un usuario: </label>
      <input required v-model="user" type="text" id="user" class="input" placeholder="Ingrese un usuario"/>
      <br>
      <v-switch label="Artista" v-model="artist"></v-switch>
      <br>
      <button @click="register" class="btn">Registrarse</button>
      <br>
      <br>
      <label>¿Necesita ayuda? </label>
      <router-link :to="{name: 'Contact'}">Haga click aquí</router-link>
    </div>
  </div>
</template>

<script>
import db from "../firebase/initFirebase"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import {mapActions} from "vuex";
export default {
  name: "Register",
  data(){
    return {
      name: null,
      surname: null,
      mail: null,
      password: null,
      user: null,
      artist: false,
    }
  },
  methods: {
    ...mapActions("user" ,{
      $update: "update",
    }),
    async register() {
      const auth = getAuth();
      const credentials = await createUserWithEmailAndPassword(auth, this.mail, this.password);
      await setDoc(doc(db, "users", credentials.user.uid), {
        name: this.name,
        surname: this.surname,
        artist: this.artist,
        username: this.user,
        agenda: [],
        muestras: [],
      });
      updateProfile(credentials.user, {
        displayName: this.user,
      });
      this.$update({user: credentials.user})
      await this.$router.push({name: 'Home'});
    }
  }
}
</script>

<style scoped>

#pageTitle{
  font-size: xx-large;
  font-weight: lighter;
  color: black;
  height: 15vh;
  text-align: center;
  min-width: 30vw;
  max-width: 90vw;
  margin: auto;
}

.main{
  position:center;
  justify-content: center;
  background-image: url("../assets/FondoHome.png");
  background-size: cover;
  background-attachment: fixed;
  margin-top: 15vh;
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