<template>
  <div id="background">
    <div id="pageTitle">
      <br>
      <b>Registrá tu muestra</b>
    </div>
    <div class="pageSubtitle">
      <b>Información de la muestra</b>
    </div>
    <div class="form">
      <br>
      <label for="name">Nombre/Título: </label>
      <input v-model="exhibition.name" type="text" id="name" placeholder="Ingrese el nombre" class="input"/>
      <br>
      <label for="description">Descripción/Texto curatorial: </label>
      <input v-model="exhibition.description" type="text" id="description" placeholder="Ingrese una descripción" class="input"/>
      <br>
      <br>
      <label for="description">Imagen representativa: </label>
      <input v-model="exhibition.image" type="text" id="image" placeholder="Ingrese un link de alguna imagen representativa" class="input"/>
      <br>
      <label for="initdate">Fecha de inicio: </label>
      <input v-model="exhibition.initdate" type="date" id="initdate" placeholder="Fecha de inicio" class="input"/>
      <br>
      <label for="enddate">Fecha de cierre: </label>
      <input v-model="exhibition.enddate" type="date" id="enddate" placeholder="Fecha de cierre" class="input"/>
      <br>
      <label for="link">Links de interés: </label>
      <input v-model="exhibition.link" type="text" id="link" placeholder="Ingrese la URL" class="input"/>
      <br>
      <label for="pictures">Subir imágenes: </label>
      <div class="input">
        <input multiple type="file" ref="files" id="pictures" @change="OnFileSelected"/>
        <div v-for="(file, index) in files" :key="index">
          <div class="level-left">
            <div class="level-item">
              {{file.name}}
              <span v-if="file.invalidMessage"> &nbsp;- {{file.invalidMessage}}</span>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <a @click.prevent="files.splice(index, 1); uploadFiles.splice(index, 1);" class="delete"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pageSubtitle">
      <br>
      <b>Ubicación</b>
    </div>
    <div class="form">
      <br>
      <label for="venueName">Nombre del lugar: </label>
      <input v-model="exhibition.venueName" type="text" id="venueName" placeholder="Ingrese el nombre" class="input"/>
      <br>
      <label for="address">Dirección: </label>
      <input v-model="exhibition.address" type="text" id="address" placeholder="Ingrese la dirección" class="input"/>
      <br>
      <label for="phone">Teléfono: </label>
      <input v-model="exhibition.phone" type="number" id="phone" placeholder="Ingrese el teléfono" class="input"/>
      <br>
      <label for="webpage">Página web: </label>
      <input v-model="exhibition.webpage" type="text" id="webpage" placeholder="Ingrese la URL" class="input"/>
      <br>
      <label for="inittime">Hora de apertura: </label>
      <input v-model="exhibition.inittime" type="time" id="inittime" placeholder="Ingrese la hora de apertura" class="input"/>
      <br>
      <label for="endtime">Hora de cierre: </label>
      <input v-model="exhibition.endtime" type="time" id="endtime" placeholder="Ingrese la hora de cierre" class="input"/>
    </div>
    <br>
    <button @click="registerExpo" class="btn">Registrar muestra</button>
  </div>
</template>

<script>
import db from "../firebase/initFirebase";
import { arrayUnion, updateDoc,setDoc,getDoc, doc, collection} from "firebase/firestore";

import _ from 'lodash';
import {mapGetters} from "vuex";
export default {
  name: "AddExposition",
  data() {
    return {
      exhibition: {},
      files: [],
      uploadFiles: [],
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
      }
      if (this.exhibition.user !== userid) {
        console.log("Esta rutina no es tuya no se como llegaste aca");
      } else {
        await setDoc(docRef, this.exhibition);
        const user = doc(db,"users", userid);
        await updateDoc(user, {
          muestras: arrayUnion(docRef),
        })
      }
      await this.$router.push("/");
    },
    OnFileSelected(){
      const files = this.$refs.files.files;
      this.uploadFiles = [...this.uploadFiles, ...files];

      this.files = [
        ...this.files,
        ..._.map(files, file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          invalidMessage: this.validate(file)
        }))
      ]
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
      this.exhibition = await getDoc(doc(db, "muestras", this.id)).data();
    }
  }
}
</script>

<style scoped>

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
  margin-top: 15vh;
  padding: 0;
  height:100vh;
}

</style>