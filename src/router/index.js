import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // redirect: '/check',
      // 判断是否需要拦截
      meta: {
        requireAuth: true,
      },
      children: [
        // {
        //   path: '/check',
        //   name: 'AppCheck',
        //   component: Check,
        // },
      ],
    },
  ],
});
