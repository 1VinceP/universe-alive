<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { Button, Card, Input, Modal } from '@/components/common';
import Nav, { NavTab } from '@/components/Nav';
import useJoinGame from '@/components/Dashboard/setups/useJoinGame';
import CreateGame from '@/components/Dashboard/LandingDash/CreateGame.vue';

export default {
   name: 'dashboard',

   components: {
      Button, Card, Input, Modal, Nav, NavTab, CreateGame,
   },

   computed: {
      ...mapState('authentication', ['user']),
      ...mapGetters('authentication', ['isAdmin']),
      ...mapState('games', ['games']),
   },

   async created() {
      await this.getAllUserGames();
   },

   methods: {
      ...mapActions('games', ['getAllUserGames']),

      gameAssoc(game) {
         return this.user.uid === game.ownerId ? 'gm'
            : game.players.find(player => this.user.uid === player.uid) ? 'player'
               : 'guest';
      },

      getColor(game) {
         return this.gameAssoc(game) === 'gm' ? 'red'
            : this.gameAssoc(game) === 'player' ? 'orange'
               : 'purple';
      },
   },

   setup() {
      const {
         gameKey,
         gameKeyError,
         joinGameLoading,
         findUnknownGameByKey,
      } = useJoinGame();

      return {
         gameKey,
         gameKeyError,
         joinGameLoading,
         findUnknownGameByKey,
      };
   },
};
</script>

<template>
   <div class="dashboard">
      <Nav>
         <NavTab v-if="isAdmin" to="/dashboard/admin">Admin Dashboard</NavTab>
         <NavTab to="/dashboard">Games Dashboard</NavTab>
         <NavTab to="/guides">Guides</NavTab>
      </Nav>

      <div class="body">
         <div class="action-bar">
            <CreateGame>
               <template #default="{ handleOpen }">
                  <Button link @click="handleOpen">+ New Game</Button>
               </template>
            </CreateGame>
         </div>

         <div class="content">
            <router-link class="global-link" v-for="game in games"
               :key="game._id"
               :to="`/dashboard/${gameAssoc(game)}/${game._id}`"
            >
               <Card :title="game.name" :color="getColor(game)" />
            </router-link>

            <Modal
               sm
               title="Game Key"
               :loading="joinGameLoading"
               @primary="findUnknownGameByKey"
               @close="gameKey = ''"
               :hasError="!!gameKeyError || !gameKey"
            >
               <template #default="{ handleOpen }">
                  <Card title="Join existing game" color="blue" @click="handleOpen" />
               </template>
               <template #body>
                  <Input
                     v-model="gameKey"
                     label="The GM can find the game key on their game's dashboard."
                     :error="gameKeyError"
                     :style="{ width: '100%' }"
                     :onEnter="(!gameKeyError && gameKey) && findUnknownGameByKey"
                  />
               </template>
            </Modal>

            <CreateGame>
               <template #default="{ handleOpen }">
                  <Card title="Create new game" color="green" @click="handleOpen" />
               </template>
            </CreateGame>
         </div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.dashboard {
   flex-grow: 1;
   display: flex;

   .body {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      padding: 30px;

      .action-bar {
         height: 30px;
         width: 100%;
         background: white;
         display: flex;
         justify-content: flex-end;
         align-items: center;
         margin-bottom: 10px;
      }

      .content {
         width: 100%;
         display: grid;
         grid-template-columns: repeat(3, 1fr);
         gap: 20px;
         justify-items: center;
         align-items: center;
      }
   }
}
</style>
