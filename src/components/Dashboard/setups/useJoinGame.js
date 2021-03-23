import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default () => {
   const store = useStore();
   const router = useRouter();
   const gameKey = ref('');
   const gameKeyError = ref('');
   const joinGameLoading = computed(() => store.state.game.loadingGame);

   watch(gameKey, () => {
      if (gameKey.value.length === 0) gameKeyError.value = '';
      else if (gameKey.value.length !== 12) gameKeyError.value = 'Game key does not match requierments.';
      else gameKeyError.value = '';
   });

   const findUnknownGameByKey = async () => {
      const retrievedGame = await store.dispatch('game/getGameByGameKey', { key: gameKey.value });
      if (!retrievedGame) gameKeyError.value = 'We couldn\'t find a game with that key.';
      else {
         const game = computed(() => store.state.game.game);
         router.push(`/dashboard/gm/${game.value._id}`);
      }
   };

   return {
      gameKey,
      gameKeyError,
      joinGameLoading,
      findUnknownGameByKey,
   };
};
