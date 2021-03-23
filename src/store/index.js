import { createStore } from 'vuex';
import authModule from './modules/auth.module';
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
      games: gamesModule,
      game: gameModule,
   },
});
