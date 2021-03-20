<script>
import Header from './Header.vue';
import Nav from './Nav/Nav.vue';

export default {
   name: 'base-route',

   components: { Header, Nav },
};
</script>

<template>
   <div class="base-route">
      <Header />
      <div class="route-body">
         <Nav />
         <router-view class="view"></router-view>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.base-route {
   min-height: 100vh;
   width: 100%;
   display: flex;
   flex-direction: column;

   .route-body {
      width: 100%;
      display: flex;

      .view { padding: 20px $screen-padding; }
   }
}
</style>
