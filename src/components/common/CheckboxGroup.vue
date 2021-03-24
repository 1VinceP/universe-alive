<script>
import Checkbox from './Checkbox.vue';

export default {
   name: 'checkbox-group',

   components: { Checkbox },

   computed: {
      groupSelection() {
         return this.$slots.default().every(slot => slot.props.modelValue);
      },
   },

   methods: {
      toggleGroup() {
         const newValue = !this.groupSelection;
         this.$emit('group-change', newValue);
         this.$slots.default().forEach(slot => slot.props['onUpdate:modelValue'](newValue));
      },
   },

   props: {
      label: { type: String, default: '' },
   },
};
</script>

<template>
   <div class="checkbox-group-wrapper">
      <div class="label">
         <Checkbox :label="label" :modelValue="groupSelection" @change="toggleGroup" />
      </div>
      <div class="children">
         <slot />
      </div>
   </div>
</template>

<style lang="scss" scoped>
.checkbox-group-wrapper {
   width: 260px;

   .children {
      margin-top: 6px;
      margin-left: 15px;
   }
}
</style>
