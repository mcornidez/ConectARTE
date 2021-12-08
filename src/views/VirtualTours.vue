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

</style>