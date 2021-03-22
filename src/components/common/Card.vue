<script>
export default {
   name: 'card',

   props: {
      game: { type: Object, default: () => ({}) },
      color: { type: String, default: '' },
   },
};
</script>

<template>
   <div class="card">
      {{ game.name }}
      <section :class="['foot', color]">
      </section>
   </div>
</template>

<style lang="scss" scoped>
.card {
   height: 300px;
   width: 400px;
   background: white;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   border: 1px solid $light-grey;
   border-radius: $radius;
   padding: 0px;
   cursor: pointer;
   transition: all .1s ease-in-out;
   &:hover { box-shadow: $shadow; }
   &:active { box-shadow: none; }

   .foot {
      height: 50px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid $light-grey;
      border-bottom-right-radius: $radius;
      border-bottom-left-radius: $radius;
      &.red { background: linear-gradient(to bottom right, firebrick, coral); }
      &.orange { background: linear-gradient(to bottom right, tomato, orange); }
      &.yellow { background: linear-gradient(to bottom right, gold, moccasin); }
      &.green { background: linear-gradient(to bottom right, darkgreen, limegreen); }
      &.blue { background: linear-gradient(to bottom right, teal, paleturquoise); }
      &.purple { background: linear-gradient(to bottom right, midnightblue, orchid); }
   }
}
</style>
