<script>
export default {
   name: 'card',

   props: {
      // game: { type: Object, default: () => ({}) },
      image: { type: String, default: '' },
      title: { type: String, default: '' },
      subtitle: { type: String, default: '' },
      color: { type: String, default: '' },
   },
};
</script>

<template>
   <div :class="['card', color]">
      <img :src="image" />
      <section :class="['foot', color]">
         <div class="title">{{ title }}</div>
         <div class="subtitle">{{ subtitle }}</div>
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
   &.red { border-color: darkred; }
   &.orange { border-color: firebrick; }
   &.yellow { border-color: gold; }
   &.green { border-color: darkgreen; }
   &.blue { border-color: teal; }
   &.purple { border-color: midnightblue; }

   .foot {
      height: 50px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      border-top: 1px solid $light-grey;
      padding: 0px 6px;
      color: white;
      text-align: left;
      text-decoration: none;
      &.red { background: linear-gradient(to bottom right, darkred, red); }
      &.orange { background: linear-gradient(to bottom right, firebrick, orange); }
      &.yellow { background: linear-gradient(to bottom right, gold, moccasin); }
      &.green { background: linear-gradient(to bottom right, darkgreen, limegreen); }
      &.blue { background: linear-gradient(to bottom right, teal, paleturquoise); }
      &.purple { background: linear-gradient(to bottom right, midnightblue, orchid); }

      .title { width: 100%; }

      .subtitle {
         width: 100%;
         font-size: 13px;
      }
   }
}
</style>
