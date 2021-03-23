<script>
export default {
   name: 'base-input',

   mounted() {
      if (this.autofocus) {
         this.$refs.input.focus();
      }
   },

   props: {
      modelValue: { type: String, default: '' },
      placeholder: { type: String, default: '' },
      label: { type: String, default: '' },
      error: { type: String, default: '' },
      full: { type: Boolean, default: false },
      password: { type: Boolean, default: false },
      autofocus: { type: Boolean, default: false },
      required: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div :class="['wrapper', { full }]">
      <div v-show="label" class="label">
         {{ label }}
         <div v-show="required" class="required">*</div>
      </div>
      <input
         ref="input"
         :class="['input', { hasError: error }]"
         :type="password ? 'password' : ''"
         :value="modelValue"
         :placeholder="placeholder"
         @input="e => $emit('update:modelValue', e.target.value)"
      />
      <div v-show="error" class="error">{{ error }}</div>
   </div>
</template>

<style lang="scss" scoped>
.wrapper {
   width: 260px;
   display: flex;
   flex-direction: column;
   margin-bottom: 10px;
   font-size: $font-sm;
   &.full { width: 100%; }

   .label {
      display: flex;
      text-align: left;

      .required {
         color: $red;
         margin-left: 2px;
      }
   }

   .input {
      height: 30px;
      width: 100%;
      margin: 3px 0px;
      border: 1px solid $grey;
      border-radius: $radius;
      outline: none;
      &:focus { border: 2px solid $blue; }
      &.hasError { border-color: $red; }
   }

   .error {
      text-align: left;
      color: $red;
   }
}
</style>
