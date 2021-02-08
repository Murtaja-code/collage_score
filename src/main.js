import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faTelegram } from '@fortawesome/free-brands-svg-icons'


library.add(faFacebook, faTelegram)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false;
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


new Vue({
  render: h => h(App)
}).$mount("#app");
