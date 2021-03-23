import ky from 'ky';

export default {
   namespaced: true,

   state: {
      games: [],
      loadingGames: false,
   },

   actions: {
      async getAllUserGames({ state, rootState }) {
         state.loadingGames = true;
         try {
            const { uid } = rootState.authentication.user;
            const games = await ky.get(`/games/${uid}`).json();
            state.games = games;
            state.loadingGames = false;
         } catch (error) {
            state.loadingGames = false;
         }
      },
   },
};
