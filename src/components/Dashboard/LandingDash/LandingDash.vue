<script>
import { mapState, mapActions } from 'vuex';
import GameCard from './GameCard.vue';

export default {
   name: 'landing-dash',

   components: { GameCard },

   computed: {
      ...mapState('games', ['games', 'loadingGames']),
   },

   async created() {
      await this.getAllUserGames();
   },

   methods: {
      ...mapActions('games', ['getAllUserGames']),
   },
};
</script>

<template>
   <div class="landing-dash">
      <div v-if="!loadingGames && games.length > 0" class="game-grid">
         <GameCard v-for="game in games" :key="game._id" :game="game" />
      </div>
      <div v-else class="game-grid">
         <GameCard :game="{ name: 'Create new game' }" />
         <GameCard :game="{ name: 'Join existing game' }" />
      </div>
   </div>
</template>

<style lang="scss" scoped>
.landing-dash {
   display: flex;

   .game-grid {
      flex-grow: 1;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      justify-items: center;
      align-items: center;
   }
}
</style>
