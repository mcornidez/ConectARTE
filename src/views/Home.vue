<template>
  <div id="home">
    <div id="pageTitle">
      <br/>
      <b>Inicio</b>
    </div>
    <div id="searchBar">
      <input type="text" v-model="search" id="search" placeholder="Buscá por artista, lugar o palabra clave"/>
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
  <div class="loading" v-show="loading">Cargando Muestras...</div>
  </div>
</template>

<script>
import db from "../firebase/initFirebase";
import {collection, query, limit, getDocs, startAfter, orderBy, arrayUnion, doc, updateDoc} from "firebase/firestore";
import {mapGetters} from "vuex";


export default {
  created () {
    window.addEventListener('scroll', this.handleScroll);
    this.getMuestrasAlpha();
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  name: 'Home',
  data(){
    return {
      expositions: [],
      search: "",
      latest: null,
      loading: false,
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
  methods: {
    async getMuestras() {
      this.loading = true;
      const q = query(collection(db, "muestras"), limit(5), orderBy("name"), startAfter(this.latest || 0));
      const datos = await getDocs(q);
      await datos.docs.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        let no = false;
        this.expositions.forEach((exp) => {
          if (data.id === exp.id) {
            no = true;
          }
        });
        if (!no) {
          this.expositions.push(data);
        }
      })
      this.latest = datos.docs[datos.docs.length - 1];
      if (datos.empty)
        window.removeEventListener('scroll', this.handleScroll);
      this.loading = false;
      },
    async handleScroll() {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        await this.getMuestras();
      }
    },
    async getMuestrasAlpha() {
      this.loading = true;
      const q = query(collection(db, "muestras"), limit(5), orderBy("name"), startAfter(this.latest || 0));
      const datos = await getDocs(q);
      await datos.docs.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        let no = false;
        this.expositions.forEach((exp) => {
          if (data.id === exp.id) {
            no = true;
          }
        });
        if (!no) {
          this.expositions.push(data);
        }
      })
      this.latest = datos.docs[datos.docs.length - 1];
      if (datos.empty)
        window.removeEventListener('scroll', this.handleScroll);
      this.loading = false;
    },
    async getMuestrasDate() {
      this.loading = true;
      const q = query(collection(db, "muestras"), limit(5), orderBy("enddate"), startAfter(this.latest || 0));
      const datos = await getDocs(q);
      await datos.docs.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        let no = false;
        this.expositions.forEach((exp) => {
          if (data.id === exp.id) {
            no = true;
          }
        });
        if (!no) {
          this.expositions.push(data);
        }
      })
      this.latest = datos.docs[datos.docs.length - 1];
      if (datos.empty)
        window.removeEventListener('scroll', this.handleScroll);
      this.loading = false;
    },
    async addToAgenda(id) {
      const user = doc(db,"users", this.$getUserId);
      await updateDoc(user, {
        agenda: arrayUnion(doc(db,"muestras",id)),
      })
    },
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
  height:100%;
  padding: 0;
  height: 100%;
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
  /*Scrolling*/
  max-height: 80%;
  box-sizing: border-box;
  overflow: auto;
  margin-left: 5%;
  margin-top: 25px;
}
.expo-container::-webkit-scrollbar {
  display: none;
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

.loading {
  font-size: 2em;
}
</style>