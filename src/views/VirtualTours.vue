<template>
  <div id="virtualTours">
    <div id="pageTitle">
      <br/>
      <b>Muestras Virtuales</b>
    </div>
    <GoogleMap/>
  </div>
</template>

<script>
import GoogleMap from "../components/GoogleMaps";

export default {
  name: "VirtualTours",
  components: {
    GoogleMap
  },
}
</script>

<style scoped>
#virtualTours{
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

img {
  max-width: 30%;
  height: auto;
}

input[type="text"]{
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
}

.grid-container {
  display: inline-grid;
  margin-top: 5vh;
  width: 60%;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-row-gap: 30px;
  margin-left: -450px;

}
.grid-item {
  background-color: lightgrey;
  padding: 20px;
  font-size: 17px;
  overflow: hidden;
  text-align: left;
  justify-content: left;
  width: auto;
  /*display: flex;*/
}

.btn{
  margin-top: 54px;
  margin-left: 15px;
  text-underline: transparent;
  border: 0.5px solid black;
}
</style>