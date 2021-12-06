import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA5RvHZGryULRZGwgTqO6Vhprv-kGiLCMk',
    libraries: 'places'
  },
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
