<script>
export default {
   name: 'nav-tab',

   computed: {
      collapsed() { return this.$parent.collapsed; },
   },

   props: {
      label: { type: String, default: '' },
   },
};
</script>

<template>
   <div :class="['tab', { collapsed }]">
      <slot></slot>
      <div>{{ !collapsed ? label : '' }}</div>
   </div>
</template>

<style lang="scss" scoped>
.tab {
   width: 100%;
   height: 46px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0px 10px;
   font-size: $font-sm;
   cursor: pointer;
   transition: all .15s ease-in-out;
   &:hover {
      // background: $light-blue;
      // color: white;
      box-shadow: $shadow;
   }
   &.collapsed {
      justify-content: center;
   }
}
</style>
