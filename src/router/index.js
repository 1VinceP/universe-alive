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
      path: '/accountsettings',
      component: EmptyRouterView,
      children: [{
         path: '',
         name: 'account-settings',
         component: () => import('../views/AccountSettings.vue'),
      }],
   },
   {
      path: '/dashboard',
      component: EmptyRouterView,
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
            path: 'gm/:id',
            name: 'gm-dash',
            component: () => import('../components/Dashboard/GMDash.vue'),
            beforeEnter: async (to, from, next) => {
               const gameId = to.params.id;
               const relation = await store.dispatch('game/checkRelation', { gameId });
               if (relation === 'owner') next();
               else if (relation === 'player') next(`/player/${gameId}`);
               else if (relation === 'guest') next(`/guest/${gameId}`);
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

router.beforeEach(async (to, _, next) => {
   console.log(store.state.authentication);
   if (to.meta.noAuth) {
      next();
   } else {
      const session = await store.dispatch('authentication/checkSession');
      if (session) next();
      else next('/login');
   }
});

export default router;
