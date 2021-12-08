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
        <input required v-model="user.username" type="text" name="username" class="input"/>
        <br>
        <b>Email: {{this.email}}</b>
        <br>
        <div v-if="$isArtist">
          <br>
          <b>Cantidad de muestras: {{user.muestras.length}}</b>
          <br>
        </div>
        <br>
        <button type="submit" class="btn">Actualizar mis datos</button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {getDoc, doc, updateDoc} from "firebase/firestore";
import db from "../firebase/initFirebase"
export default {
  name: "Profile",
  data() {
    return {
      user: {
        muestras: [],
      },
      email:"",
      id:"",
    };
  },
  computed: mapGetters("user", {
    $getUserId: "getId",
    $getEmail: "getEmail",
    $isArtist: "isArtist",
  }),
  methods: {
    async getUser() {
      if (this.$getUserId) {
        const docs = await getDoc(doc(db, "users", this.$getUserId));
        this.user = docs.data();
        this.email = this.$getEmail;
        this.id = this.$getUserId;
      }
    },
    async updateProf() {
      const userRef = doc(db, "users", this.$getUserId);
      await updateDoc(userRef, {
        name: this.user.name,
        surname: this.user.surname,
        username: this.user.username,
      });
      this.$router.push({name: "Home"});
    }
  },
  watch: {
    $getUserId() {
      this.getUser();
    }
  },
  beforeMount() {
    this.getUser();
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
