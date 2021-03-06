<template>
  <div id="myagenda">
    <div id="pageTitle">
      <br/>
      <b>{{ exposition.name }}</b>
    </div>
    <div class="expo-container">
      <div class="expo-item">
        <div class="expo-img">
          <img :src='exposition.image'/>
        </div>
        <div style="text-align: left;">
          <v-icon>mdi-thumb-up</v-icon>
          <span> {{exposition.likes}} Me gusta</span>
        </div>
        <div class="expo-descr">
          <p>{{ exposition.description }}</p>
        </div>
      </div>
      <div class="home-item">
        <div class="venue">
          <p>{{ exposition.artist }}</p>
        </div>
        <div class="venueData">
          <p>{{ exposition.artistDesc }}</p>
        </div>
        <br>
        <div class="venue">
          <p>{{ exposition.venueName }}</p>
        </div>
        <div class="venueData">
          <p>Dirección: {{ exposition.address }}</p>
          <p>Teléfono: {{ exposition.phone }}</p>
          <p>Horarios: {{ exposition.inittime }}hs - {{ exposition.endtime }}hs</p>
          <p>Página web: {{ exposition.webpage }}</p>
        </div>
      </div>
    </div>
    <div class="addButton">
      <v-btn v-if="show" :to="{name: 'AddExposition', params: { id: exposition.id },}" class="btn">
        <span>Editar</span>
      </v-btn>
      <v-btn v-if="getUserId" @click="addToAgenda" class="btn">
        <span>{{ inAgenda ? "Eliminar de mi agenda" : "Agregar a mi agenda" }}</span>
      </v-btn>
      <v-btn v-if="getUserId" @click="incrementLikeCounter()" class="btn">
        <v-icon>mdi-thumb-up</v-icon>
        <span style="margin-left: 5px">Me gusta</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
import {getDoc, doc, updateDoc, increment, arrayUnion, arrayRemove} from "firebase/firestore";
import db from "../firebase/initFirebase";
import {mapGetters} from "vuex";

export default {
  name: "Exposition",
  data() {
    return {
      inAgenda: false
    };
  },
  props: {
    exposition: Object,
    slug: String,
  },
  computed: {
    ...mapGetters("user", {
      getUserId: "getId",
    }),
    show() {
      return this.getUserId === this.exposition.user;
    }
  },
  methods: {
    async getExposition() {
      if (this.slug) {
        const exposition = await getDoc(doc(db, "muestras", this.slug));
        if (!exposition.exists()) {
          await this.$router.push({name: "NotFound"})
        }
        const data = exposition.data();
        data.id = exposition.id;
        this.exposition = data;
      }
    },
    async getUser() {
      if (this.getUserId) {
        const docs = await getDoc(doc(db, "users", this.getUserId));
        let agenda = docs.data().agenda;
        agenda.forEach((muestra) => {
          if (this.slug === muestra.id)
            this.inAgenda = true;
        })
        this.id = this.$getUserId;
      }
    },
    async addToAgenda() {
      const user = doc(db,"users", this.getUserId);
      if (this.inAgenda) {
        await updateDoc(user, {
          agenda: arrayRemove(doc(db,"muestras",this.slug)),
        })
        this.inAgenda = false;
      }
      else {
        await updateDoc(user, {
          agenda: arrayUnion(doc(db,"muestras",this.slug)),
        })
        this.inAgenda = true;
      }
    },
    async incrementLikeCounter() {
      await updateDoc(doc(db, "muestras", this.slug), {
        likes: increment(1) // Nota: Si en Firestore el contador de likes se llama algo distitno de "likes", cambiar acá
      });
    }
  },
  beforeMount() {
    this.getUser();
    if (!this.exposition) {
      this.getExposition();
    }
  },
  watch: {
    getUserId() {
      this.getUser();
    }
  },
}
</script>

<style scoped>
#myagenda {
  justify-content: center;
  background-image: url("../assets/FondoHome.png");
  background-size: cover;
  background-attachment: fixed;
  margin-top: 10vh;
  padding: 0;
  position: center;
  height: 100%;
}

#pageTitle {
  font-size: xx-large;
  color: black;
  height: 15vh;
  text-align: left;
  min-width: 30vw;
  max-width: 90vw;
  margin: auto;
}


img {
  max-width: 40%;
  min-width: 40%;
  height: auto;
  float: left;
}

input[type="text"] {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
}

.expo-container {
  display: flex;
  flex-direction: row;
}

.home-item {
  flex-basis: 100%;
  font-size: 14px;
  margin-left: 10%;
  margin-top: 25px;
  margin-right: 5%;
}

.expo-item {
  flex-basis: 100%;
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

.expo-descr {
  padding: 5px;
  font-size: 14px;
  overflow: hidden;
  text-align: left;
  justify-content: left;
  grid-gap: 10px;
}

.venueData {
  text-align: left;
}

.venue {
  font-size: x-large;
  font-weight: lighter;
  color: black;
  text-align: left;
}

.btn{
  margin: 2%;
}

</style>
