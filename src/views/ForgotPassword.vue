<template>
  <div id="background">
    <div id="pageTitle">
      <br>
      <b>¿Olvidaste tu contraseña?</b>
    </div>
    <div class="form">
      <br>
      <input required v-model="user" type="text" placeholder="Introduzca su usuario" class="input"/>
      <br>
      <input required v-model="email" type="email" placeholder="Introduzca su mail" class="input"/>
      <br>
      <button @click="sendForm" class="btn">Enviar link de recupero de contraseña</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword"
}
</script>

<style scoped>
#background{
  position:center;
  justify-content: center;
  background-image: url("../assets/FondoHome.png");
  background-size: cover;
  background-attachment: fixed;
  margin-top: 10vh;
  padding: 0;
  height:100vh;
}

#pageTitle{
  font-size: x-large;
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