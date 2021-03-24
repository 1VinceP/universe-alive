import ky from 'ky';

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
         try {
            const game = await ky.post('/game', { json: gameData }).json();
            state.creatingGame = false;
            state.game = game;
            return game._id;
         } catch (error) {
            state.creatingGame = false;
            state.creatingGameError = error;
            return false;
         }
      },
   },
};
