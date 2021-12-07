<template>
  <div id="myagenda">
    <div id="pageTitle">
      <br/>
      <b>Mi Agenda</b>
    </div>
    <div id="searchBar">
      <input type="text" v-model="search" id="search" placeholder="Busca por artista, lugar o palabra clave"/>
    </div>
    <div class="grid-container">
      <div v-for="exposition in expositions" :key="exposition.name" class="single-exposition">
        <router-link style="text-decoration: none; color: inherit;" :to="{name: 'Exposition', params:{slug:exposition.slug}}">
          <div class="grid-item">
            <img :src='exposition.image'/>
            <h2>{{exposition.name}}</h2>
            <p>{{exposition.description}}</p>
          </div>
        </router-link>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "MyAgenda",
  data(){
    return {
      expositions: store.myexpositions,
      search: "",
    }
  },
  computed: {
    filteredExpositions: function(){
      return this.expositions.filter((exposition) => {
        return exposition.name.match(this.search) || exposition.venue.match(this.search) || exposition.artist.match(this.search);
      })
    }
  }
}
</script>

<style scoped>
#myagenda{
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

#searchBar{
  position: center;
  width: 40%;
  margin-left: 450px;
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