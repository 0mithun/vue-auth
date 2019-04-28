import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import  VueResource from 'vue-resource'
import router from './routes'
import store from './store';

import { MdCard,MdButton, MdField } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

Vue.use(MdCard)
Vue.use(MdButton)
Vue.use(MdField)
Vue.use(VueResource)
Vue.http.options.root = 'https://vue-auth-153ea.firebaseio.com'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
