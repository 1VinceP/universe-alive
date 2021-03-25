<script>
import Button from './Button.vue';

export default {
   name: 'base-dropdown',

   components: { Button },

   data: () => ({
      open: false,
   }),

   computed: {
      alignment() {
         return this.align === 'right' ? { right: 0 }
            : this.align === 'left' ? { left: 0 }
               : this.align === 'center' && { left: '-50%' };
      },
   },

   methods: {
      handleClickOutside() {
         this.open = false;
      },
   },

   props: {
      label: { type: String, default: '' },
      align: { type: String, default: 'right' },
   },
};
</script>

<template>
   <div v-click-outside="handleClickOutside" class="dropdown-container">
      <Button id="trigger" :class="{ open }" secondary @click="open = !open">
         {{ label }}
         <span class="caret" />
      </Button>

      <div v-show="open"
         :class="['dropdown-list', { right: align === 'right', left: align === 'left' }]"
         :style="{ ...alignment }"
         @click="$nextTick(() => { open = false; })"
      >
         <slot />
      </div>
   </div>
</template>

<style lang="scss" scoped>
.dropdown-container {
   position: relative;

   .open {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
   }

   .caret {
      width: 0;
      height: 0;
      display: inline-block;
      margin-left: 6px;
      vertical-align: middle;
      border-top: 4px dashed;
      border-top: 4px solid;
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
   }

   .dropdown-list {
      width: 200px;
      background: white;
      display: flex;
      flex-direction: column;
      border: 1px solid $blue;
      border-radius: $radius;
      padding: 4px;
      position: absolute;
      top: calc(100% - 1px);
      z-index: 10;
      box-shadow: $shadow;
      &.right { border-top-right-radius: 0px; }
      &.left { border-top-left-radius: 0px; }

      .list-item + .list-item {
         margin-top: 4px;
      }
   }
}
</style>
