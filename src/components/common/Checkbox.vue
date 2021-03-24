<script>
export default {
   name: 'checkbox',

   props: {
      label: { type: String, default: '' },
      details: { type: String, default: '' },
      modelValue: { type: Boolean, default: false },
      required: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div class="checkbox-wrapper">
      <span class="box-group">
         <input
            :id="`check-${$.uid}`"
            type="checkbox"
            :checked="modelValue"
            @change="$emit('update:modelValue', !modelValue)"
         />
         <label :for="`check-${$.uid}`" class="ml-3 text-black text-sm">
            {{ label }}
            <div v-show="required" class="required">*</div>
         </label>
      </span>
      <div v-show="details" class="details">{{ details }}</div>
   </div>
</template>

<style lang="scss" scoped>
.checkbox-wrapper {
   width: 100%;
   display: flex;
   flex-direction: column;
   font-size: $font-sm;
   cursor: pointer;
   &.checkbox-wrapper + .checkbox-wrapper {
      margin-top: 6px;
   }

   .box-group {
      display: flex;

      input {
         margin: 0px;
         margin-right: 6px;
         cursor: pointer;
      }

      label {
         display: flex;
         margin-top: 2px;
         cursor: pointer;

         .required {
            margin-left: 2px;
            color: $red;
         }
      }
   }

   .details {
      color: $grey;
      text-align: left;
      font-size: $font-xs;
   }
}
</style>
