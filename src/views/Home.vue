<script>
import Header from '@/components/Header.vue';

export default {
   name: 'Home',
   components: {
      Header,
   },
};
</script>

<template>
   <div class="home">
      <Header />
   </div>
</template>

<style lang="scss" scoped>
.home {
   height: 100vh;
   width: 100%;
   background: linear-gradient(to bottom right, slategray, orange);
}
</style>
