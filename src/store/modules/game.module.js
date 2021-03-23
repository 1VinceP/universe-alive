import ky from 'ky';

export default {
   namespaced: true,

   state: {
      game: {},
      loadingGame: false,
      loadingGameError: '',
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
   },
};
