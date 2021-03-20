import { createStore } from 'vuex';
import authModule from './modules/auth';
import gamesModule from './modules/games';

export default createStore({
   state: {
   },
   mutations: {
   },
   actions: {
   },
   modules: {
      authentication: authModule,
      games: gamesModule,
   },
});
