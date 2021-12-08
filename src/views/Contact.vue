<template>
  <div id="background">
    <div id="pageTitle">
      <br>
      <b>Contactanos</b>
    </div>
    <div class="form">
      <form ref="form" @submit.prevent="sendEmail">
      <br>
      <input required v-model="name" type="text" name="name" id="name" placeholder="Nombre" class="input"/>
      <br>
      <input required v-model="email" type="email" name="email" placeholder="Email" class="input"/>
      <br>
      <textarea required v-model="message" name="message" type="text" placeholder="Mensaje" class="input"/>
      <br>
      <button type="submit" class="btn">Enviar mensaje</button>
      </form>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
import emailjs from 'emailjs-com';

export default {
  name: "Help",
  data() {
    return {
      name: "",
      email: "",
      message: "",
    };
  },
  computed: mapGetters("user", {
    $isLoggedIn: "isLoggedIn",
    $getName: "getName",
    $getEmail: "getEmail",
  }),
  methods: {
    sendEmail() {
      try {
        emailjs.sendForm('service_ll2bmts', "template_d36cisw", this.$refs.form,"user_9bC4eutcbYqMFyQbsId7D")
      } catch(error) {
        console.log({error});
      }
      this.$router.push("/");
    },
    loadUser() {
      if (this.$isLoggedIn) {
        this.name = this.$getName;
        this.email = this.$getEmail;
      }
    },
  },
  watch: {
    $isLoggedIn() {
      this.loadUser();
    }
  },
  beforeMount() {
    this.loadUser();
  }
};
</script>

<style scoped>

#background{
  justify-content: center;
  background-image: url("../assets/FondoHome.png");
  background-size: cover;
  background-attachment: fixed;
  margin-top: 15vh;
  padding: 0;
  position:absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
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

</style>