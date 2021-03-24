<script>
import Spinner from './Spinner.vue';

export default {
   name: 'base-button',

   components: { Spinner },

   props: {
      id: { type: String, default: '' },
      to: { type: String, default: '' },
      link: { type: Boolean, default: false },
      secondary: { type: Boolean, default: false },
      full: { type: Boolean, default: false },
      sm: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      loading: { type: Boolean, default: false },
   },
};
</script>

<template>
   <router-link v-if="to" :to="to" class="button-router-wrapper">
      <button
         :id="id"
         :class="['base-button', {
            primary: !link && !secondary,
            link,
            secondary,
            full,
            sm,
            disabled: disabled || loading,
         }]"
         :disabled="disabled || loading"
      >
         <Spinner v-if="loading" />
         <slot v-else></slot>
      </button>
   </router-link>
   <button v-else
      :id="id"
      :class="['base-button', {
         primary: !link && !secondary,
         link,
         secondary,
         full,
         sm,
         disabled: disabled || loading,
      }]"
      :disabled="disabled || loading"
   >
      <Spinner v-if="loading" />
      <slot v-else></slot>
   </button>
</template>

<style lang="scss" scoped>
.button-router-wrapper:hover {
   .base-button {
      background: $light-blue;
      &.link {
         background: transparent;
         color: $light-blue;
      }
      &.secondary {
         background: transparent;
         color: $light-blue;
         border-color: $light-blue;
      }
   }
}

.base-button {
   height: 30px;
   background: $blue;
   border: 3px solid transparent;
   border-radius: $radius;
   padding: 0px 8px;
   font-size: $font-sm;
   color: #fff;
   outline: none;
   cursor: pointer;
   transition: all .1s ease-in-out;
   &.disabled {
      background: rgba($blue, 0.5);
      pointer-events: none;
   }
   &:hover { background: $light-blue; }
   &:active { border-color: $blue; }
   &.sm {
      height: 26px;
      font-size: $font-xs;
   }

   &.link {
      background: transparent;
      border: none;
      padding: 0px;
      color: $blue;
      &:hover { color: $light-blue; }
      &.disabled { color: rgba($blue, 0.5); }
   }

   &.secondary {
      background: transparent;
      border: 1px solid $blue;
      color: $blue;
      &:hover {
         border-color: $light-blue;
         color: $light-blue;
      }
      &:active { border-color: $blue; }
      &.disabled {
         color: rgba($blue, 0.5);
         border-color: rgba($blue, 0.5);
      }
   }

   &.full { width: 100%; }
}
</style>
