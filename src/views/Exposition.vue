<template>
  <div id="myagenda">
    <h1>{{exposition.name}}</h1>
    <br/>
    <br/>
    <section class="exposition">
      <div class="destination-details">
        <img
            :src="exposition.image"
            :alt="exposition.name"
        />
        <p>{{ exposition.description }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import {getDoc, doc} from "firebase/firestore";
import db from "../firebase/initFirebase"

export default {
  name: "Exposition",
  props: {
    exposition: Object,
    slug: String,
  },
  methods: {
    async getExposition() {
      if (this.slug) {
        const exposition = await getDoc(doc(db, "muestras", this.slug));
        const data = exposition.data();
        data.id = exposition.id;
        this.exposition = data;
      }
    }
  },
  beforeMount() {
    if (!this.exposition) {
      this.getExposition();
    }
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
  height:100vh;
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


.destination-details {
  display: flex;
  justify-content: space-between;
}
</style>

<!--<template>-->
<!--  <section class="text">-->
<!--    <h1>Exposition: {{exposition.name}}</h1>-->
<!--    <div class="text-sm-body-1">-->
<!--      <img :src='exposition.image' :alt="exposition.name"/>-->
<!--      <p>{{exposition.description}}</p>-->
<!--    </div>-->
<!--  </section>-->
<!--</template>-->

<!--<script>-->
<!--import store from "@/store"-->
<!--export default {-->
<!--  name: "Exposition",-->
<!--  data(){-->
<!--    return{-->
<!--      expositionSlug: this.$route.params.slug-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    exposition(){-->
<!--      return store.find(-->
<!--          exposition => exposition.slug === this.expositionSlug-->
<!--      )-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->