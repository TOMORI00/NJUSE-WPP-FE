import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home';
import Gudgements from '../views/Gudgements';

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
      redirect: '/judgements',
      children: [
        {
          path: '/judgements',
          name: 'Gudgements',
          component: Gudgements,
        },
      ],
    },
  ],
});
