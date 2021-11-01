// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import 'ant-design-vue/dist/antd.css';
// import Antd from 'ant-design-vue';
import store from './store';
import App from './App';
import router from './router';
import api from './api';

// Vue.use(Antd);
// Vue.use(Menu);
Vue.config.productionTip = false;

Vue.prototype.$api = api; // 将api挂载到vue的原型上

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
