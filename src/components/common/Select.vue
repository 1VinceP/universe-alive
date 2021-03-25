<script>
export default {
   name: 'base-select',

   props: {
      label: { type: String, default: '' },
      details: { type: String, default: '' },
      modelValue: { type: String, default: '' },
      required: { type: Boolean, default: false },
      noDefault: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div class="select-wrapper">
      <div v-show="label" class="label">
         {{ label }}
         <div v-show="required" class="required">*</div>
      </div>
      <select
         class="select"
         :value="modelValue"
         :disabled="disabled"
         @change="e => $emit('update:modelValue', e.target.value)"
      >
         <template v-if="!noDefault">
            <slot name="init">
               <option value="">-- Select --</option>
            </slot>
         </template>
         <slot />
      </select>
      <div v-show="details" class="details">{{ details }}</div>
   </div>
</template>

<style lang="scss" scoped>
.select-wrapper {
   width: 260px;
   display: flex;
   flex-direction: column;
   margin-bottom: 10px;
   font-size: $font-sm;

   .label {
      display: flex;
      text-align: left;

      .required {
         margin-left: 2px;
         color: $red;
      }
   }

   .select {
      height: 30px;
      width: 100%;
      margin: 3px 0px;
      border: 1px solid $grey;
      border-radius: $radius;
      outline: none;
      text-transform: capitalize;
      &:focus { border: 2px solid $blue; }
      &[disabled] { background: #e4e4e4; }
   }

   .details {
      text-align: left;
      color: $grey;
      font-size: $font-xs;
   }
}
</style>
