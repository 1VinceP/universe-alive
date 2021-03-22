<script>
export default {
   name: 'dash-nav',

   data: () => ({
      collapsed: false,
   }),
};
</script>

<template>
   <div :class="['nav', { collapsed }]">
      <!-- <Tab @click="collapsed = !collapsed">{{ collapsed ? '&#8677;' : '&#8676;' }}</Tab> -->
      <slot />
   </div>
</template>

<style lang="scss" scoped>
.nav {
   height: calc(100vh - #{$header-height});
   width: 200px;
   min-width: 200px;
   background: linear-gradient(midnightblue, orchid);
   display: flex;
   flex-direction: column;
   position: sticky;
   top: $header-height;
   left: 0;
   box-shadow: $shadow-right;
   transition: width .15s ease-in-out;
   &.collapsed { width: 46px; }
}
</style>
