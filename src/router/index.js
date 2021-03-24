import { createRouter, createWebHistory } from 'vue-router';
import { ADMIN } from '@/constants/accountTypes.constants';
import EmptyRouterView from '../components/EmptyRouterView.vue';
import Home from '../views/Home.vue';
import store from '../store';

const routes = [
   {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { noAuth: true },
   },
   {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: { noAuth: true },
      beforeEnter: (to, from, next) => {
         if (store.state.authentication.user.uid) {
            next('/dashboard');
         } else next();
      },
   },
   {
      path: '/dashboard',
      component: EmptyRouterView,
      beforeEnter: to => console.log(to),
      children: [
         {
            path: '',
            name: 'base-dash',
            component: () => import('../views/Dashboard.vue'),
         },
         {
            path: 'admin',
            name: 'admin-dash',
            component: () => import('../components/Dashboard/AdminDash.vue'),
            beforeEnter: (to, from, next) => {
               if (store.state.authentication.user.accountType === ADMIN) next();
               else next('/dashboard');
            },
         },
         {
            path: 'gm',
            name: 'gm-dash',
            beforeEnter: (to, from, next) => {
               const { game } = store.state;
               const isGM = store.getters['/game/isGM'];
               if (isGM) next();
               else if (game.open) next(`/guest/${game._id}`);
               else next('/dashboard');
            },
         },
         {
            path: 'player',
            name: 'player-dash',
         },
         {
            path: 'guest',
            name: 'guest-dash',
         },
      ],
   },
];

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes,
});

router.beforeEach((to, _, next) => {
   if (to.meta.noAuth) {
      next();
   } else if (store.state.authentication.user.uid) {
      next();
   } else {
      next('/login');
   }
});

export default router;
