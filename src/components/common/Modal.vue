<script>
import Button from './Button.vue';

export default {
   name: 'base-modal',
   emits: ['primary', 'close'],

   components: { Button },

   data: () => ({
      modalOpen: false,
   }),

   computed: {
      disabled() { return this.hasError || this.loading; },
   },

   watch: {
      loading(newValue, oldValue) {
         if (oldValue && !newValue && !this.hasError) {
            this.handleClose();
         }
      },
   },

   methods: {
      handleOpen() {
         this.modalOpen = true;
      },

      preventClose(e) {
         e.stopPropagation();
      },

      handleClose(e, type) {
         if (!this.loading) {
            this.$emit('close', e, type);
            this.modalOpen = false;
         }
      },
   },

   props: {
      title: { type: String, default: 'Modal' },
      triggerLabel: { type: String, default: 'Show Modal' },
      primaryLabel: { type: String, default: 'Confirm' },
      position: {
         type: String,
         default: 'center',
         validation: value => ['center', 'top'].indexOf(value) !== -1,
      },
      loading: { type: Boolean, default: false },
      hasError: { type: Boolean, default: false },
      sm: { type: Boolean, default: false },
      lg: { type: Boolean, default: false },
   },
};
</script>

<template>
   <slot :handleOpen="handleOpen">
      <Button @click="handleOpen">{{ triggerLabel }}</Button>
   </slot>

   <teleport to="#app">
      <div v-if="modalOpen" :class="['modal-container', position]" @click="handleClose">
         <div :class="['modal', { sm, lg }]" @click="preventClose">
            <header>
               <span class="title">{{ title }}</span>
            </header>
            <div class="body">
               <slot name="body" />
            </div>
            <footer>
               <Button link @click="handleClose" class="cancel" :disabled="loading">Cancel</Button>
               <Button @click="$emit('primary')" :loading="loading" :disabled="disabled">{{ primaryLabel }}</Button>
            </footer>
         </div>
      </div>
   </teleport>
</template>

<style lang="scss" scoped>
.modal-container {
   height: 100vh;
   width: 100%;
   background: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   position: absolute;
   top: 0;
   left: 0;
   z-index: 99;
   &.center { align-items: center; }
   &.top { padding-top: 60px; }

   .modal {
      height: 400px;
      width: 650px;
      background: white;
      display: flex;
      flex-direction: column;
      border-radius: $radius;
      box-shadow: $shadow;
      &.sm {
         height: auto;
         min-height: 200px;
         width: 475px;
      }
      &.lg {
         height: 600px;
         width: 975px;
      }

      header {
         // fix janky resize with body
         height: 46px;
         min-height: 46px;
         max-height: 46px;
         width: 100%;
         display: flex;
         justify-content: space-between;
         align-items: center;
         border-bottom: 1px solid $light-grey;
         padding: 0px 20px;

         .title { font-size: 20px; }
      }

      .body {
         flex-grow: 1;
         height: 100%;
         width: 100%;
         display: flex;
         justify-content: center;
         align-items: center;
         padding: 0px 20px;
      }

      footer {
         width: 100%;
         display: flex;
         justify-content: flex-end;
         border-top: 1px solid $light-grey;
         padding: 10px 20px;

         .cancel { margin-right: 20px; }
      }
   }
}
</style>
