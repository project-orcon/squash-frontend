import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VeeValidate from 'vee-validate';
import globalFuncs from './mixins/globalFunctions';

Vue.mixin(globalFuncs); 


Vue.config.productionTip = false
Vue.prototype.$baseUrl= "http://localhost:3000"
Vue.prototype.$http= axios;

Vue.use(VeeValidate);

Vue.prototype.$headers = {
  "Content-Type": "application/json",
  "Authorization": localStorage.getItem('token')
}


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
