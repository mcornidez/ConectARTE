<template>
  <div id="myagenda">
    <div id="pageTitle">
      <br/>
      <b>Mis Muestras</b>
    </div>
    <div class="expo-container">
      <div v-for="exposition in expositions" :key="exposition.id" class="single-exposition">
        <router-link style="text-decoration: none; color: inherit;" :to="{name: 'Exposition', params: { exposition: exposition, slug: exposition.id },}">
          <div class="grid-expo-item">
            <div class="expoContainer">
              <div class="expoItem">
                <img :src='exposition.image'/>
              </div>
              <div class="expoItem">
                <p>{{ exposition.initdate }} - {{ exposition.enddate }}</p>
                <h2>{{exposition.name}} - {{exposition.artist}}</h2>
                <p>{{exposition.description}}</p>
                <div style="float: left">
                  <v-icon>mdi-thumb-up</v-icon>
                  <span> {{exposition.likes}} me gusta</span>
                </div>
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

import {doc, getDoc} from "firebase/firestore";
import db from "@/firebase/initFirebase";
import {mapGetters} from "vuex";

export default {
  name: "MyAgenda",
  data(){
    return {
      expositions: [],
      search: "",
      loading: false,
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
      this.loading = true;
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
      this.loading = false;
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
  height:100%;
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

input[type="text"]{
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
}

.expo-container {
  display: grid;
  width: 60%;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-row-gap: 30px;
  /*Scrolling*/
  max-height: 80%;
  box-sizing: border-box;
  overflow: hidden;
  margin-left: 5%;
  margin-top: 25px;
}

.grid-expo-item {
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
  grid-gap: 10px;
}

.addButton {
  padding: 5px;
  text-align: right;
  float: left;
}

.expoContainer {
  display: inline-grid;
  grid-template-columns: 300px 2fr;
}

img {
  width: 100%;
  object-fit: cover;
}

.loading {
  font-size: 2em;
}
</style>