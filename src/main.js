import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import axios from "./api/http";
import 'element-ui/lib/theme-chalk/index.css';
import vuescroll from "vuescroll"; //引入vuescroll
import "vuescroll/dist/vuescroll.css"; //引入vuescroll样式

Vue.use(vuescroll); //使用
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')