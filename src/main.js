import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'vue-good-table/dist/vue-good-table.css';
import VueGoodTablePlugin from 'vue-good-table';
import axios from 'axios'
import VModal from 'vue-js-modal'
import Multiselect from 'vue-multiselect'


axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/"

Vue.config.productionTip = false
Vue.use(VueGoodTablePlugin);
Vue.use(VModal)
Vue.component('multiselect', Multiselect) 

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
