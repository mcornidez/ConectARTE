<template>
  <div id="background">
    <div id="pageTitle">
      <br>
      <b>{{this.id? "Edita tu muestra" : "Registrá tu muestra"}}</b>
    </div>
    <div class="pageSubtitle">
      <b>Información de la muestra</b>
    </div>
    <div class="form">
      <form ref="form" @submit.prevent="registerExpo">
      <br>
      <div class="item">
        <label for="name">Nombre/Título: </label>
        <input v-model="exhibition.name" type="text" id="name" placeholder="Ingrese el nombre" class="input" required/>
      </div>
      <br>
      <div class="item">
        <label for="description">Descripción: </label>
        <input v-model="exhibition.description" type="text" id="description" placeholder="Ingrese una descripción" class="input" required/>
      </div>
      <br>
      <div class="item">
        <label for="description">Imagen representativa: </label>
        <input v-model="exhibition.image" type="text" id="image" placeholder="Ingrese un link de alguna imagen representativa" class="input" required/>
      </div>
      <br>
      <div class="item">
        <label for="initdate">Fecha de inicio: </label>
        <input v-model="exhibition.initdate" type="date" id="initdate" placeholder="Fecha de inicio" class="input" required/>
      </div>
      <br>
      <div class="item">
        <label for="enddate">Fecha de cierre: </label>
        <input v-model="exhibition.enddate" type="date" id="enddate" placeholder="Fecha de cierre" class="input" required/>
      </div>
      <br>
      <div class="item">
        <label for="link">Links de interés: </label>
        <input v-model="exhibition.link" type="text" id="link" placeholder="Ingrese la URL" class="input"/>
      </div>
      <br>
        <div class="pageSubtitle">
          <br>
          <b>Artista</b>
        </div>
        <br>
        <div class="item">
          <label for="name">Nombre del artista: </label>
          <input v-model="exhibition.artist" type="text" id="artist" placeholder="Ingrese su nombre" class="input" required/>
        </div>
        <div class="item">
          <label for="name">Descripción del artista: </label>
          <input v-model="exhibition.artistDesc" type="text" id="artistDesc" placeholder="Ingrese breve descripción" class="input" required/>
        </div>
    <br>
    <div class="pageSubtitle">
      <br>
      <b>Ubicación</b>
    </div>
      <br>
      <div class="item">
        <label for="venueName">Nombre del lugar: </label>
        <input v-model="exhibition.venueName" type="text" id="venueName" placeholder="Ingrese el nombre" class="input" required/>
      </div>
      <br>
      <div class="item">
        <label for="address">Dirección: </label>
        <input v-model="exhibition.address" type="text" id="address" placeholder="Ingrese la dirección" class="input" required/>
      </div>
      <br>
      <div class="item">
        <label for="phone">Teléfono: </label>
        <input v-model="exhibition.phone" type="number" id="phone" placeholder="Ingrese el teléfono" class="input" required/>
      </div>
      <br>
      <div class="item">
        <label for="webpage">Página web: </label>
        <input v-model="exhibition.webpage" type="text" id="webpage" placeholder="Ingrese la URL" class="input" required/>
      </div>
      <br>
      <div class="item">
        <label for="inittime">Hora de apertura: </label>
        <input v-model="exhibition.inittime" type="time" id="inittime" placeholder="Ingrese la hora de apertura" class="input" required/>
      </div>
      <br>
      <div class="item">
        <label for="endtime">Hora de cierre: </label>
        <input v-model="exhibition.endtime" type="time" id="endtime" placeholder="Ingrese la hora de cierre" class="input" required/>
      </div>
        <br>
        <div class="boton">
          <v-btn dark type="submit" class="btn">
            <b>{{this.id? "Guardar cambios" : "Registrar muestra"}}</b>
          </v-btn>
          <v-btn dark v-if="id" @click="deleteExpo" class="btn">Eliminar muestra</v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "../firebase/initFirebase";
import { deleteDoc, arrayRemove, arrayUnion, updateDoc,setDoc,getDoc, doc, collection} from "firebase/firestore";

import {mapGetters} from "vuex";
export default {
  name: "AddExposition",
  data() {
    return {
      exhibition: {},
      files: [],
    }
  },
  props: {
    id: String,
  },
  computed: mapGetters("user", {
    $getUserId: "getId",
  }),
  methods: {
    async registerExpo() {
      let docRef;
      const userid = this.$getUserId;
      if (this.id) {
        docRef = doc(db, "muestras", this.id);
      }
      else {
        docRef = doc(collection(db, "muestras"));
        this.exhibition.user = userid;
        this.exhibition.likes = 0;
      }
      if (this.exhibition.user !== userid) {
        console.log("Esta muestra no es tuya no se como llegaste acá");
      } else {
        await setDoc(docRef, this.exhibition);
        const user = doc(db,"users", userid);
        await updateDoc(user, {
          muestras: arrayUnion(docRef),
        })
      }
      await this.$router.push({name: "Home"});
    },
    async deleteExpo() {
      if (this.id) {
        const userid = this.$getUserId;
        if (this.exhibition.user !== userid) {
          console.log("Esta muestra no es tuya no se como llegaste acá");
        } else {
          const docRef = doc(db, "muestras", this.id);
          await deleteDoc(docRef);
          const user = doc(db,"users", userid);
          await updateDoc(user, {
            muestras: arrayRemove(docRef),
          })
        }
      }
      await this.$router.push({name: "Home"});
    },
    validate(file){
      const MAX_SIZE = 1000000;
      const allowedTypes = ["image/jpeg", "image/png"];
      if (file.size > MAX_SIZE)
        return `Tamaño máximo permitido es ${MAX_SIZE/1000}Kb`;
      if (!allowedTypes.includes(file.type))
        return "Sólo válidos archivos .jpeg y .png";
      return null;
    },
  },
  async beforeMount() {
    if (this.id) {
      const muestra = await getDoc(doc(db, "muestras", this.id));
      this.exhibition = muestra.data();
    }
  }
}
</script>

<style scoped>

#pageTitle{
  font-size: x-large;
  font-weight: lighter;
  color: black;
  height: 15vh;
  text-align: left;
  min-width: 30vw;
  max-width: 90vw;
  margin: auto;
}

.pageSubtitle{
  font-size: x-large;
  font-weight: lighter;
  color: black;
  text-align: left;
  min-width: 30vw;
  max-width: 90vw;
  margin: auto;
}

.form{
  text-align: left;
  min-width: 30vw;
  max-width: 90vw;
  margin: auto;
  flex-direction: column;
}

#background{
  position:center;
  justify-content: center;
  background-image: url("../assets/FondoHome.png");
  background-size: cover;
  background-attachment: fixed;
  margin-top: 10vh;
  padding: 0;
  height:100%;
}

.item{
  height: 50px;
}

.input{
  float: right;
  margin-right: 5%;
}

.btn{
  margin: 2%;
}

.boton{
  text-align: center;
}

</style>
