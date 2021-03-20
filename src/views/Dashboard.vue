<script>
import { Button } from '@/components/common';

export default {
   name: 'dashboard',

   components: { Button },
};
</script>

<template>
   <div class="dashboard">
      <div class="action-bar">
         <Button link>+ New Game</Button>
      </div>
      <router-view></router-view>
   </div>
</template>

<style lang="scss" scoped>
.dashboard {
   flex-grow: 1;

   .action-bar {
      height: 30px;
      width: 100%;
      background: white;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 10px;
   }
}
</style>
