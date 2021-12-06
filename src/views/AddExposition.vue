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
      <input v-model="title" type="text" id="name" placeholder="Ingrese el nombre" class="input"/>
      <br>
      <label for="description">Descripción/Texto curatorial: </label>
      <input v-model="description" type="text" id="description" placeholder="Ingrese una descripción" class="input"/>
      <br>
      <label for="initdate">Fecha de inicio: </label>
      <input v-model="initdate" type="date" id="initdate" placeholder="Fecha de inicio" class="input"/>
      <br>
      <label for="enddate">Fecha de cierre: </label>
      <input v-model="enddate" type="date" id="enddate" placeholder="Fecha de cierre" class="input"/>
      <br>
      <label for="link">Links de interés: </label>
      <input v-model="link" type="text" id="link" placeholder="Ingrese la URL" class="input"/>
    </div>
    <div class="pageSubtitle">
      <br>
      <b>Ubicación</b>
    </div>
    <div class="form">
      <br>
      <label for="venueName">Nombre del lugar: </label>
      <input v-model="venueName" type="text" id="venueName" placeholder="Ingrese el nombre" class="input"/>
      <br>
      <label for="address">Dirección: </label>
      <input v-model="address" type="text" id="address" placeholder="Ingrese la dirección" class="input"/>
      <br>
      <label for="phone">Teléfono: </label>
      <input v-model="phone" type="number" id="phone" placeholder="Ingrese el teléfono" class="input"/>
      <br>
      <label for="webpage">Página web: </label>
      <input v-model="webpage" type="text" id="webpage" placeholder="Ingrese la URL" class="input"/>
      <br>
      <label for="inittime">Hora de apertura: </label>
      <input v-model="inittime" type="time" id="inittime" placeholder="Ingrese la hora de apertura" class="input"/>
      <br>
      <label for="endtime">Hora de cierre: </label>
      <input v-model="endtime" type="time" id="endtime" placeholder="Ingrese la hora de cierre" class="input"/>
    </div>
    <br>
    <button @click="registerExpo" class="btn">Registrar muestra</button>
  </div>
</template>

<script>
import db from "../firebase/initFirebase";
import {setDoc, doc, collection} from "firebase/firestore/lite";

export default {
  name: "AddExposition",
  data() {
    return {
      id: null,
      title: "",
      description: "",
      initdate: "",
      enddate: "",
      link: "",
      venueName: "",
      address: "",
      phone: "",
      webpage: "",
      inittime: "",
      endtime: ""
    }
  },
  methods: {
    async registerExpo() {
      let docRef;
      if (this.id === null)
        docRef = doc(collection(db, "muestras"));
      else
        docRef = doc(db, "muestras", this.id);
      alert(docRef);
      const exhibition = {
        name: this.title,
        description: this.description,
        initdate: this.initdate,
        enddate: this.enddate,
        link: this.link,
        venueName: this.venueName,
        address: this.address,
        phone: this.phone,
        webpage: this.webpage,
        inittime: this.inittime,
        endtime: this.endtime
      }
      await setDoc(docRef, exhibition);
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