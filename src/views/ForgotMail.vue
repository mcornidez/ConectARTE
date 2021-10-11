<template>
  <div class="mainBody">
    <h1 id="MainTitle">¿Olvidaste tu mail?</h1>
    <div class="form">
      <div class="titulo">Introduzca su nombre de usuario:</div>
      <input v-model="usuario" type="text" class="inputField"/>
      <!-- pregunta de seguridad hardcodeada, estaría bueno poder utilizar la API para modificar-->
      <div class="titulo">Coloque la respuesta a su pregunta de seguridad: ¿Cuál fue el nombre de su primer mascota?</div>
      <input type="text" class="inputField"/>
      <br>
      <v-btn dark color="blue" class="boton">Enviar</v-btn>
      <!-- aca faltaria poner un v-if (valida) que lo lleve a cambiar el usuario
      y que si no, lo devuelva a la página de login con algun cartelito-->
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotMail"
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
  padding-top: 20px;
}
</style>