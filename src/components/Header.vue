<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { Button, Dropdown } from '@/components/common';

export default {
   name: 'home-header',

   components: { Button, Dropdown },

   computed: {
      ...mapState('authentication', ['user']),
      ...mapGetters('authentication', ['isAuthenticated']),

      userItems() {
         return [
            { label: 'Account Settings', route: '/accountsettings' },
            { label: 'Logout', action: this.logout, style: { background: 'red' }, type: 'full' },
         ];
      },
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

      <div v-if="isAuthenticated">
         <!-- <Button secondary @click="logout">{{ user.username }}</Button> -->
         <Dropdown :items="userItems">
            {{ user.username }}
         </Dropdown>
      </div>
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
