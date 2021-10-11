<template>
  <div class="mainBody">
    <h1 id="MainTitle">¿Olvidaste tu contraseña?</h1>
    <div class="form">
      <div class="titulo">Ingrese su email para enviar un correo de reestablecimiento</div>
      <input type="text" class="inputField"/>
      <br>
      <v-btn dark color="blue" class="boton">Enviar</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword"
}
</script>

<style scoped>
#MainTitle{
  background-color: lightblue;
  border-radius: 15px;
  border: 1px solid black;
  width: 80vw;
  margin: auto;
  margin-bottom: 40px;
}
h1{
  color: black;
  font-family: "Raleway", sans-serif;
  padding-top: 15px;
  padding-bottom: 15px;
}
.mainBody{
  background-image: url("../assets/ProfileFondo.jpg");
  background-size: cover;
  height: 100vh;
}
.form{
  background-color: lightblue;
  width: 60vw;
  font-size: xx-large;
  font-family: "Raleway", sans-serif;
  margin:auto;
  justify-content: center;
  border-radius: 20px;
}
.titulo{
  padding-top: 20px;
  font-family: "Raleway", sans-serif;
  font-size: x-large;
  font-weight: bolder;
  max-width: 800px;
  margin:auto;
}
.inputField{
  border: 1px solid black;
  border-radius: 5px;
  padding-top: 20px;
  font-size: x-large;
  width: 80%;
}
.boton{
  font-weight: bolder;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>