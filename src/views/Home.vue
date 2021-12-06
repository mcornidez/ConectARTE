<template>
  <div id="home">
    <div id="pageTitle">
      <br/>
      <b>Inicio</b>
    </div>
    <div id="searchBar">
      <input type="text" v-model="search" id="search" placeholder="Busca por artista, lugar o palabra clave"/>
    </div>
    <div class="grid-container">
      <div v-for="exposition in filteredExpositions" :key="exposition.name" class="single-exposition">
        <router-link style="text-decoration: none; color: inherit;" :to="{name: 'Exposition', params:{slug:exposition.slug}}">
          <div class="grid-item">
            <div class="expoContainer">
              <div class="expoItem">
                <img :src='exposition.image'/>
              </div>
              <div class="expoItem">
                <h2>{{exposition.name}}</h2>
                <p>{{exposition.description}}</p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import db from "../firebase/initFirebase";
import {collection, getDocs} from "firebase/firestore/lite";

export default {
  name: 'Home',
  data(){
    return {
      expositions: [],
      search: "",
    }
  },
  computed: {
    filteredExpositions: function(){
      return this.expositions.filter((exposition) => {
          return exposition.name.match(this.search) || exposition.description.match(this.search);
      })
    }
  },
  methods: {
    async getMuestras() {
      const citiesCol = collection(db, "muestras");
      const citySnapshot = await getDocs(citiesCol);
      return citySnapshot.docs.map(doc => doc.data());
    },
  },
  async beforeMount() {
    this.expositions = await this.getMuestras();
  }
};
</script>

<style scoped>

#home{
  position:center;
  justify-content: center;
  background-image: url("../assets/FondoHome.png");
  background-size: cover;
  background-attachment: fixed;
  margin-top: 15vh;
  padding: 0;
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
  width: 100%;
  object-fit: cover;
}

input[type="text"]{
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
}

.grid-container {
  display: grid;
  margin-top: 5vh;
  width: 60%;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-row-gap: 30px;
  margin-left: 100px;
}
.grid-item {
  background-color: lightgrey;
  padding: 20px;
  font-size: 17px;
  overflow: hidden;
  text-align: left;
  justify-content: left;
}
.expoItem {
  padding: 5px;
  font-size: 17px;
  overflow: hidden;
  text-align: left;
  justify-content: left;
}

.expoContainer {
  display: inline-grid;
  grid-template-columns: 300px 1fr
}

.btn{
  margin-top: 54px;
  margin-left: 15px;
  text-underline: transparent;
  border: 0.5px solid black;
}


</style>