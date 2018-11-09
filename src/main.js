import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

Vue.config.productionTip = false
Vue.prototype.$baseUrl= "http://localhost:3000"
Vue.prototype.$http= axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
