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
      <div v-for="exposition in filteredExpositions" :key="exposition.id" class="single-exposition">
        <router-link style="text-decoration: none; color: inherit;" :to="{name: 'Exposition', params: { exposition: exposition, slug: exposition.id }}">
          <div class="grid-item">
            <img :src='exposition.image' alt="image"/>
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

import {doc, getDoc} from "firebase/firestore";
import db from "@/firebase/initFirebase";
import {mapGetters} from "vuex";

export default {
  name: "MyAgenda",
  data(){
    return {
      expositions: [],
      search: "",
    }
  },
  computed: {
    filteredExpositions: function(){
      return this.expositions.filter((exposition) => {
        let result = false;
        if (exposition.name != null) {
          result = exposition.name.match(this.search);
        }
        if (exposition.description != null) {
          result = result || exposition.description.match(this.search);
        }
        return result;
      })
    },
    ...mapGetters("user" ,{
      $getUserId: "getId",
    }),
  },
  watch: {
    $getUserId() {
      this.getExpositions();
    },
  },
  methods: {
    async getExpositions() {
      if (this.$getUserId) {
        const user = await getDoc(doc(db, "users", this.$getUserId));
        this.expositions = [];
        const muestras = user.data().muestras;
        for (let i = 0; i < muestras.length; i++) {
          const doc = await getDoc(muestras[i]);
          if (doc.exists()) {
            const data = doc.data();
            data.id = doc.id;
            this.expositions.push(data);
          }
        }
      }
    },
  },
  beforeMount() {
    this.getExpositions();
  },
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
  height:100%;
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