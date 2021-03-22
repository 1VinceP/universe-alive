<script>
import Header from './Header.vue';

export default {
   name: 'base-route',

   components: { Header },
};
</script>

<template>
   <div class="base-route">
      <Header />
      <router-view></router-view>
   </div>
</template>

<style lang="scss" scoped>
.base-route {
   min-height: 100vh;
   width: 100%;
   display: flex;
   flex-direction: column;
}
</style>
