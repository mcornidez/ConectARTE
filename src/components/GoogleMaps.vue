<template>
  <GmapMap
      :center="center"
      :zoom="2"
      style="width: 1000px; height: 500px; margin: auto"
  >
    <GmapInfoWindow
        :options="infoWindowOptions"
        :position="infoWindowPosition"
        :opened="infoWindowOpened"
        @closeclick="handleInfoWindowClose"
    >
      <h2>{{ activeTour.title }}</h2>
      <p>{{ activeTour.address }}</p>
      <a :href="activeTour.link" target="_blank">{{ activeTour.link }}</a>
    </GmapInfoWindow>
    <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :title="m.title"
        :clickable="true"
        :draggable="false"
        @click="handleMarkerClicked(m)"
    ></GmapMarker>
  </GmapMap>
</template>
<script>
export default {
  data () {
    return {
      center: {lat: 0, lng: 0},
      infoWindowOptions:{
        pixelOffset:{
          width: 0,
          height: -35
        }
      },
      activeTour:{

      },
      infoWindowOpened: false,
      markers: [{
        position: {lat: 48.8606, lng: 2.3376},
        title: "Musée du Louvre (Museo del Louvre)",
        address: "Rue de Rivoli, 75001 Paris, Francia",
        link: "https://www.louvre.fr/en/online-tours"
      },{
        position: {lat: 51.5194, lng: -0.1270},
        title: "British Museum (Museo Británico)",
        address: "Great Russell St, London WC1B 3DG, Reino Unido",
        link: "https://britishmuseum.withgoogle.com"
      },{
        position: {lat: 52.3600, lng: 4.8852},
        title: "Rijksmuseum",
        address: "Museumstraat 1, 1071 XX Amsterdam, Países Bajos",
        link: "https://artsandculture.google.com/partner/rijksmuseum"
      },{
        position: {lat: 40.7830, lng: -73.9590},
        title: "Solomon R. Guggenheim Museum (Museo Solomon R. Guggenheim)",
        address: "1071 5th Ave, New York, NY 10128, Estados Unidos",
        link: "https://artsandculture.google.com/partner/solomon-r-guggenheim-museum"
      },{
        position: {lat: 35.1569, lng: 129.0576},
        title: "국립현대미술관 (Museo Nacional de Arte Moderno y Contemporáneo de Corea del Sur)",
        address: "313 Gwangmyeong-ro, Makgye-dong, Gwacheon-si, Gyeonggi-do, Corea del Sur",
        link: "https://artsandculture.google.com/partner/national-museum-of-modern-and-contemporary-art-korea?hl=en"
      },{
        position: {lat: 52.3584, lng: 4.8811},
        title: "Van Gogh Museum (Museo van Gogh)",
        address: "Museumplein 6, 1071 DJ Amsterdam, Países Bajos",
        link: "https://artsandculture.google.com/partner/van-gogh-museum?hl=en"
      },{
        position: {lat: 41.9029, lng: 12.4534},
        title: "Musei Vaticani (Museo Vaticano)",
        address: "00120 Cdad. del Vaticano, Ciudad del Vaticano",
        link: "https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/tour-virtuali-elenco.html"
      },{
        position: {lat: -13.1631, lng: -72.5450},
        title: "Machu Picchu",
        address: "Machu Picchu, Perú",
        link: "https://www.youvisit.com/tour/machupicchu"
      },{
        position: {lat: 37.9715, lng: 23.7257},
        title: "η Ακρόπολη της Αθήνας (Acrópolis de Atenas)",
        address: "Athens 105 58, Grecia",
        link: "https://www.acropolisvirtualtour.gr"
      },{
        position: {lat: 51.5094, lng: -0.1399},
        title: "Royal Academy of Arts (Real Academia de Artes)",
        address: "Burlington House, Piccadilly, London W1J 0BD, Reino Unido",
        link: "https://www.eyerevolution.co.uk/tours/SensingSpaces/"
      },{
        position: {lat: -34.584056, lng: -58.392806},
        title: "Museo Nacional de Bellas Artes",
        address: "Av. del Libertador 1473, Buenos Aires, Argentina",
        link: "https://www.flickr.com/photos/186501806@N04/albums/72157718149713561"
      },
      ]
    }
  },
  computed: {
    infoWindowPosition() {
      return {
        lat: parseFloat(this.activeTour.lat),
        lng: parseFloat(this.activeTour.lng)
      }
    },
  },
  methods: {
    handleMarkerClicked(m){
      this.activeTour = m;
      this.infoWindowOpened = true;
      this.center=m.position;
    },
    handleInfoWindowClose(){
      this.activeTour = {};
      this.infoWindowOpened = false;
    },
  }
}
</script>
