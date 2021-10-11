<template>
  <div id="background">
    <div id="pageTitle">
      <br>
      <b>Contactanos</b>
    </div>
    <div class="form">
      <br>
      <input required v-model="name" type="text" id="name" placeholder="Nombre" class="input"/>
      <br>
      <input required v-model="email" type="email" placeholder="Email" class="input"/>
      <br>
      <input required v-model="message" type="text" placeholder="Mensaje" class="input"/>
      <br>
      <button @click="sendForm" class="btn">Enviar mensaje</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "Help",
};
</script>

<style scoped>

#background{
  margin-top: 15vh;
  background-image: url("../assets/FondoHome.png");
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
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