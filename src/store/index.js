import { createStore } from 'vuex';
import authModule from './modules/auth.module';
import adminModule from './modules/admin.modules';
import gamesModule from './modules/games.module';
import gameModule from './modules/game.module';

export default createStore({
   state: {
   },
   mutations: {
   },
   actions: {
   },
   modules: {
      authentication: authModule,
      admin: adminModule,
      games: gamesModule,
      game: gameModule,
   },
});
