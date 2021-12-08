<template>
  <div id="profile">
    <div id="pageTitle">
      <br/>
      <b>Mi Perfil</b>
    </div>
    <div class="form">
      <form ref="form" @submit.prevent="updateProf">
        <br>
        <b>Nombre: </b>
        <br>
        <input required v-model="user.name" type="text" name="name" class="input"/>
        <br>
        <b>Apellido: </b>
        <br>
        <input required v-model="user.surname" type="text" name="surname" class="input"/>
        <br>
        <b>Nombre de usuario: </b>
        <br>
        <input required v-model="username" type="text" name="username" class="input"/>
        <br>
        <b>Email: </b>
        <br>
        <input required v-model="email" type="email" name="email" class="input"/>
        <br>
        <b>Cantidad de muestras: {{user.agenda.length}}</b>
        <br>
        <br>
        <button type="submit" class="btn">Actualizar mis datos</button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {getDoc, doc} from "firebase/firestore";
import db from "../firebase/initFirebase"
//import {getAuth} from "firebase/auth";


export default {
  name: "Profile",
  data() {
    return {
      user: null,
      username:"",
      email:"",
      id:"",
    };
  },
  computed: mapGetters("user", {
    $getUserId: "getId",
    $getEmail: "getEmail",
    $getUserName: "getName"
  }),
  methods: {
    async getUser() {
      const docs = await getDoc(doc(db, "users", this.$getUserId));
      this.user = docs.data();
      this.email = this.$getEmail;
      this.username = this.$getUserName;
      this.id = this.$getUserId;
    },
    async updateProf() {
      /*const auth = getAuth();
      this.username = "hola";
      await auth.updateUser(this.id, {email: "toto@gmail.com"});*/
      //actualizar datos del backend
    }
  },
  beforeMount() {
    if (!this.user) {
      this.getUser();
    }
  },

};
</script>

<style scoped>

#profile{
  position:center;
  justify-content: center;
  background-image: url("../assets/FondoHome.png");
  background-size: cover;
  background-attachment: fixed;
  margin-top: 15vh;
  padding: 0;
  height:100vh;
}

#pageTitle{
  font-size: xx-large;
  font-weight: lighter;
  color: black;
  height: 15vh;
  text-align: left;
  min-width: 30vw;
  max-width: 90vw;
  margin: auto;
}

.form{
  flex-direction: column;
  width: 80%;
  display: inline-block;
}

.input{
  margin-top: 5px;
}






</style>
