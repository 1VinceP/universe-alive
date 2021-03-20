import { createRouter, createWebHistory } from 'vue-router';
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
   },
   {
      path: '/dashboard',
      component: EmptyRouterView,
      children: [
         {
            path: '',
            name: 'base-dash',
            component: () => import('../views/Dashboard.vue'),
            children: [
               {
                  path: '',
                  name: 'landing-dash',
                  component: () => import('../components/Dashboard/LandingDash/LandingDash.vue'),
               },
               {
                  path: '/admin',
                  name: 'admin-dash',
               },
               {
                  path: '/gm',
                  name: 'gm-dash',
               },
               {
                  path: '/player',
                  name: 'player-dash',
               },
            ],
         },
      ],
   },
];

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes,
});

router.beforeEach((to, _, next) => {
   const isAuthenticated = store.getters['authentication/isAuthenticated'];
   if (to.meta.noAuth) {
      next();
   } else if (isAuthenticated) {
      next();
   } else {
      next({ path: '/login' });
   }
});

export default router;
