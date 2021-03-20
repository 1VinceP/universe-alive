<script>
import { mapActions, mapGetters } from 'vuex';
import { Button } from '@/components/common';

export default {
   name: 'home-header',

   components: { Button },

   computed: {
      ...mapGetters('authentication', ['isAuthenticated']),
   },

   methods: {
      ...mapActions('authentication', ['logoutUser']),

      async logout() {
         try {
            const status = await this.logoutUser();
            if (status) this.$router.push('/');
         } catch (error) {
            console.log(error);
         }
      },
   },
};
</script>

<template>
   <header>
      <!-- <img src="" /> -->
      <span class="title">Universe Alive</span>

      <div v-if="isAuthenticated"><Button @click="logout">Log out</Button></div>
      <div v-else>
         <router-link to="/login" class="login">
            <Button link>Log in</Button>
         </router-link>
         <router-link to="/login?type=new">
            <Button>Sign Up</Button>
         </router-link>
      </div>
   </header>
</template>

<style lang="scss" scoped>
header {
   height: $header-height;
   width: 100%;
   background: white;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0px $screen-padding;
   position: sticky;
   top: 0;
   left: 0;
   z-index: 2;
   box-shadow: $shadow;

   .title {
      font-size: $font-lg;
   }

   .login {
      margin-right: 16px;
   }
}
</style>
