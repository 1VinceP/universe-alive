<script>
export default {
   name: 'base-spinner',
};
</script>

<template>
   <div class="dots-wrapper">
      <span class="loading-dots">
         <div class="loading-dots--dot" />
         <div class="loading-dots--dot" />
         <div class="loading-dots--dot" />
      </span>
   </div>
</template>

<style lang="scss">
@keyframes dot-keyframes {
   0% {
      opacity: .4;
      transform: scale(1, 1);
   }

   50% {
      opacity: 1;
      transform: scale(1.2, 1.2);
   }

   100% {
      opacity: .4;
      transform: scale(1, 1);
   }
}

.dots-wrapper {
   height: 100%;
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
}

.loading-dots {
   height: 100%;
   width: 45px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0px 6px;

   &--dot {
      height: 8px;
      width: 8px;
      animation: dot-keyframes 1.5s infinite ease-in-out;
      background-color: $indego;
      border-radius: 50%;
      display: inline-block;
      &:nth-child(2) { animation-delay: .5s; }
      &:nth-child(3) { animation-delay: 1s; }
   }
}
</style>
