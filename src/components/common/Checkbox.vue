<script>
export default {
   name: 'checkbox',

   props: {
      label: { type: String, default: '' },
      modelValue: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div class="wrapper">
      <input
         id="check"
         type="checkbox"
         :checked="modelValue"
         @change="$emit('update:modelValue', !modelValue)"
      />
      <label for="check" class="ml-3 text-black text-sm">{{ label }}</label>
   </div>
</template>

<style lang="scss" scoped>
.wrapper {
   width: 100%;
   display: flex;
   justify-content: flex-start;
   align-items: center;
   font-size: $font-sm;
   cursor: pointer;

   input {
      margin: 0px;
      margin-right: 6px;
      cursor: pointer;
   }

   label {
      margin-top: 2px;
      cursor: pointer;
   }
}
</style>
