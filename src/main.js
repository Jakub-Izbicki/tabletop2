import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import vOutsideEvents from 'vue-outside-events'
import './assets/tailwind.css'

Vue.config.productionTip = false;
Vue.use(vOutsideEvents);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
