<script>
import { mapState, mapActions } from 'vuex';
import { Button, Card, Input, Modal } from '@/components/common';
import Nav, { NavTab } from '@/components/Nav';
import useJoinGame from '@/components/Dashboard/setups/useJoinGame';

export default {
   name: 'dashboard',

   components: { Button, Card, Input, Modal, Nav, NavTab },

   computed: {
      ...mapState('authentication', ['user']),
      ...mapState('games', ['games']),
   },

   async created() {
      await this.getAllUserGames();
   },

   methods: {
      ...mapActions('games', ['getAllUserGames']),

      gameAssoc(game) {
         return this.user.uid === game.owner_id ? 'gm'
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
         <NavTab>Dashboard</NavTab>
         <NavTab>Guides</NavTab>
      </Nav>

      <div class="body">
         <div class="action-bar">
            <Modal>
               <template v-slot:default="{ handleOpen }">
                  <Button link @click="handleOpen">+ New Game</Button>
               </template>
            </Modal>
         </div>

         <div class="content">
            <router-link v-for="game in games"
               :key="game._id"
               :to="`/dashboard/${gameAssoc(game)}/${game._id}`"
            >
               <Card :game="game" :color="getColor(game)" />
            </router-link>

            <Modal
               sm
               title="Game Key"
               :loading="joinGameLoading"
               @primary="findUnknownGameByKey"
               @close="gameKey = ''"
               :hasError="!!gameKeyError || !gameKey"
            >
               <template v-slot:default="{ handleOpen }">
                  <Card title="Join existing game" color="blue" @click="handleOpen" />
               </template>
               <template v-slot:body>
                  <Input
                     v-model="gameKey"
                     label="The GM can find the game key on their game's dashboard."
                     :error="gameKeyError"
                     :style="{ width: '100%' }"
                  />
               </template>
            </Modal>
            <Card title="Create new game" color="green" />
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
