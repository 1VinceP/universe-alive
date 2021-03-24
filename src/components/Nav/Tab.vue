<script>
export default {
   name: 'nav-tab',

   computed: {
      collapsed() { return this.$parent.collapsed; },
   },

   props: {
      label: { type: String, default: '' },
      to: { type: String, default: '' },
   },
};
</script>

<template>
   <router-link :class="['global-link tab', { collapsed }]" :to="to">
      <slot></slot>
      <div>{{ !collapsed ? label : '' }}</div>
   </router-link>
</template>

<style lang="scss" scoped>
.tab {
   width: 100%;
   height: 46px;
   // background: rgba(255, 255, 255, 0.4);
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0px 10px;
   font-size: $font-sm;
   color: white;
   cursor: pointer;
   transition: all .15s ease-in-out;
   &:hover {
      // background: rgba(255, 255, 255, 0.6);
      background: rgba(255, 255, 255, 0.2);
   }
   &.collapsed {
      justify-content: center;
   }
}
</style>
