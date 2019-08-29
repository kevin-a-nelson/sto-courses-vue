import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'vue-good-table/dist/vue-good-table.css';
import VueGoodTablePlugin from 'vue-good-table';
import axios from 'axios'
import VModal from 'vue-js-modal'
import Multiselect from 'vue-multiselect'
import Notifications from 'vue-notification'
import DropDown from 'vue-dropdowns'
import VueDropdown from 'vue-dynamic-dropdown'

import EyeOutline from 'mdi-vue/EyeOutline.vue'
import Plus from 'mdi-vue/Plus.vue'

Vue.component('eye-icon', EyeOutline)
Vue.component('plus-icon', Plus)





import Buefy from 'buefy'
Vue.use(Buefy)


axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/"

Vue.config.productionTip = false
Vue.use(VueGoodTablePlugin);
Vue.use(VModal)
Vue.component('multiselect', Multiselect) 
Vue.component('dropdown', DropDown)
Vue.use(Notifications)
// Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
