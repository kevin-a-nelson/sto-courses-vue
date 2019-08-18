import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'vue-good-table/dist/vue-good-table.css';
import VueGoodTablePlugin from 'vue-good-table';
import axios from 'axios'

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/"

Vue.config.productionTip = false
Vue.use(VueGoodTablePlugin);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
