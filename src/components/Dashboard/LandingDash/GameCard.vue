<script>
export default {
   name: 'game-card',

   props: {
      game: { type: Object, default: () => ({}) },
   },
};
</script>

<template>
   <div class="game-card">{{ game.name }}</div>
</template>

<style lang="scss" scoped>
.game-card {
   height: 300px;
   width: 400px;
   background: white;
   border: 1px solid $light-grey;
   border-radius: 3px;
   cursor: pointer;
   transition: all .1s ease-in-out;
   &:hover { box-shadow: $shadow; }
}
</style>
