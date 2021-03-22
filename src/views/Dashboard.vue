<script>
import { mapState, mapActions } from 'vuex';
import { Button, Card } from '@/components/common';
import Nav, { NavTab } from '@/components/Nav';
//

export default {
   name: 'dashboard',

   components: { Button, Card, Nav, NavTab },

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
   <div class="dashboard">
      <Nav>
         <NavTab>Guides</NavTab>
         <NavTab>Adventure</NavTab>
      </Nav>

      <div class="body">
         <div class="action-bar">
            <Button link>+ New Game</Button>
         </div>

         <div class="content">
            <Card v-for="game in games" :key="game._id" :game="game" />
            <Card :game="{ name: 'Join existing game' }" color="blue" />
            <Card :game="{ name: 'Create new game' }" color="green" />
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
