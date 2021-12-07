<template>
  <div id="home">
    <div id="pageTitle">
      <br/>
      <b>Inicio</b>
    </div>
    <div id="searchBar">
      <input type="text" v-model="search" id="search" placeholder="Busca por artista, lugar o palabra clave"/>
    </div>
    <div class="home-container">
        <div class="expo-container">
          <div v-for="exposition in filteredExpositions" :key="exposition.id" class="single-exposition">
            <router-link style="text-decoration: none; color: inherit;" :to="{name: 'Exposition', params: { exposition: exposition, slug: exposition.id },}">
              <div class="grid-expo-item">
                <div class="expoContainer">
                  <div class="expoItem">
                    <img :src='exposition.image'/>
                  </div>
                  <div class="expoItem">
                    <h2>{{exposition.name}}</h2>
                    <p>{{exposition.description}}</p>
                    <div class="addButton">
                      <v-btn @click="addToAgenda(exposition.id)">
                        <span>Añadir a mi agenda</span>
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
      </div>
      <div class="home-item">
        <div class="orderBy">
          <p>Ordenar por:</p>
          <v-radio-group v-model="order">
            <v-radio v-for="option in orderOptions" :key="option.value" :label="option.text" color="yellow"/>
          </v-radio-group>
        </div>
        <div style="margin-top: 50px">
          <input v-model="subscribe" type="text" placeholder="Suscribite al newsletter"/>
          <v-btn dark style="margin-top: 10px" @click="subscribe()">Suscribite</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../firebase/initFirebase";
import {onSnapshot, collection, query, orderBy, doc, updateDoc, arrayUnion} from "firebase/firestore"
import {mapGetters} from "vuex";

export default {
  name: 'Home',
  data(){
    return {
      expositions: [],
      search: "",
      order: "",
      orderOptions: [
        {value: 'alpha', text: 'Orden alfabético'},
        {value: 'date', text: 'Fecha de cierre'},
      ],
      subscribe: "",
    }
  },
  computed: {
    filteredExpositions: function(){
      return this.expositions.filter((exposition) => {
          return exposition.name.match(this.search) || exposition.description.match(this.search);
      })
    },
    ...mapGetters("user" ,{
      $getUserId: "getId",
    }),
  },
  methods: {
    async getMuestras() {
      const citiesCol = collection(db, "muestras");
      await onSnapshot(citiesCol, (querySnapshot) => {
        this.expositions = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          this.expositions.push(data);
        })
      });
    },
    async getMuestrasAlpha() {
      const citiesCol = collection(db, "muestras");
      const q = query(citiesCol, orderBy("name"));
      await onSnapshot(q, (querySnapshot) => {
        this.expositions = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          this.expositions.push(data);
        })
      });
    },
    async getMuestrasDate() {
      const citiesCol = collection(db, "muestras");
      const q = query(citiesCol, orderBy("date"));
      await onSnapshot(q, (querySnapshot) => {
        this.expositions = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          this.expositions.push(data);
        })
      });
    },
    async addToAgenda(id) {
      const user = doc(db,"users", this.$getUserId);
      await updateDoc(user, {
        agenda: arrayUnion(doc(db,"muestras",id)),
      })
    },
  },
  beforeMount() {
    this.getMuestras();
  },
  subscribe(){

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
  margin-left: 30%;
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

.home-container {
  display: flex;
  flex-direction: row;
}

.home-item {
  font-size: 17px;
  margin-left: 10%;
  margin-top: 25px;
  margin-right: 5%;
}

.expo-container {
  display: grid;
  width: 60%;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-row-gap: 30px;
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

.orderBy {
  background-color: lightgrey;
  padding: 20px;
  font-size: 17px;
  text-align: left;
  justify-content: left;
}


</style>