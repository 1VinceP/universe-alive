import ky from 'ky';
import { shortId } from '@/utils';

export default {
   namespaced: true,

   state: {
      game: {},
      loadingGame: false,
      loadingGameError: '',
      creatingGame: false,
      creatingGameError: '',
   },

   actions: {
      async getGameByGameKey({ state }, { key }) {
         state.loadingGame = true;
         try {
            const game = await ky.get(`/game/key/${key}`).json();
            state.game = game;
            state.loadingGame = false;
            return true;
         } catch (error) {
            state.loadingGame = false;
            return false;
         }
      },

      async createGame({ state }, { gameData }) {
         state.creatingGame = true;
         const body = { ...gameData, gameKey: shortId(12) };
         try {
            const game = await ky.post('/game', { json: body }).json();
            state.creatingGame = false;
            state.game = game;
            return game._id;
         } catch (error) {
            state.creatingGame = false;
            state.creatingGameError = error;
            return false;
         }
      },

      async checkRelation(_, { gameId }) {
         try {
            const relation = await ky.get(`/game/relation/${gameId}`).json();
            return relation;
         } catch (error) {
            console.log(error);
            return 'guest';
         }
      },
   },
};
