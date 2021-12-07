<template>
  <div id="home">
    <div id="pageTitle">
      <br/>
      <b>Inicio</b>
    </div>
    <div id="searchBar">
      <input type="text" v-model="search" id="search" placeholder="Busca por artista, lugar o palabra clave"/>
    </div>
    <div class="grid-container" id="grid">
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
    <div class="loading" v-show="loading">Cargando Muestras...</div>
  </div>
</template>

<script>
import db from "../firebase/initFirebase";
import {collection, query, limit, getDocs, startAfter, orderBy} from "firebase/firestore";

export default {
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  async beforeMount() {
    await this.getMuestras();
  },
  name: 'Home',
  data(){
    return {
      expositions: [],
      search: "",
      latest: null,
      loading: false
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
      this.loading = true;
      const q = query(collection(db, "muestras"), limit(5), orderBy("name"), startAfter(this.latest || 0));

      // CONFIRMADO QUE CON ONSNAPSHOT NO ANDA POR ALGUNA RAZÓN

      // const datos = await onSnapshot(q, (querySnapshot) => {
      //   this.expositions = [];
      //   querySnapshot.forEach((doc) => {
      //     this.expositions.push(doc.data());
      //   });
      // });

      const datos = await getDocs(q);
      await datos.docs.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        this.expositions.push(data);
      })
      this.latest = datos.docs[datos.docs.length - 1];
      if (datos.empty)
        window.removeEventListener('scroll', this.handleScroll);
      this.loading = false;
      },
    async handleScroll() {
      console.log("prueba");
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        await this.getMuestras();
      }
    }
  },
}
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
  /*Scrolling*/
  max-height: 80%;
  box-sizing: border-box;
  overflow: auto;
}
.grid-container::-webkit-scrollbar {
  display: none;
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

.loading {
  font-size: 2em;
}
</style>