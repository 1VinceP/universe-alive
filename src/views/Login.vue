<script>
import { mapActions, mapState } from 'vuex';
import { Button, Checkbox, Input } from '@/components/common';

export default {
   name: 'login',

   components: { Button, Checkbox, Input },

   data: () => ({
      username: '',
      email: '',
      password: '',
      password2: '',
      remember: false,
   }),

   created() {
      document.addEventListener('keypress', this.handleEnter);
   },

   unmounted() {
      document.removeEventListener('keypress', this.handleEnter);
   },

   computed: {
      ...mapState('authentication', ['userLoading', 'authError']),

      isNew() { return this.$route.query.type === 'new'; },

      disabled() {
         if (this.isNew) return !this.email || !this.password || this.password !== this.password2;
         return !this.email || !this.password;
      },

      passError() {
         if (this.isNew && this.password !== this.password2) return 'Passwords do not match.';
         return '';
      },
   },

   methods: {
      ...mapActions('authentication', ['registerUser', 'loginUser']),

      handleEnter(e) {
         if (e.key === 'Enter') this.login();
      },

      async login() {
         const {
            username, email, password, disabled, isNew, registerUser, loginUser,
         } = this;
         if (disabled) return;

         const action = isNew ? registerUser : loginUser;
         try {
            const success = await action({ username, email, password });
            if (success) this.$router.push('/dashboard');
         } catch (error) {
            console.log(error.message);
         }
      },
   },
};
</script>

<template>
   <div class="page">
      <div class="background" />

      <div class="login-card">
         <div class="title">{{ isNew ? 'Create Account' : 'Login' }}</div>

         <div class="inputs">
            <Input v-show="isNew" v-model="username" label="Username" full autofocus required />
            <Input v-model="email" label="Email" full :autofocus="!isNew" required />
            <Input v-model="password" label="Password" full password required />
            <Input
               v-show="isNew"
               v-model="password2"
               label="Repeat Password"
               full
               password
               required
               :error="passError"
            />
            <Checkbox v-model="remember" label="Remember me" />
         </div>

         <div v-show="authError" class="error">{{ authError }}</div>

         <Button full class="button" :disabled="disabled" @click="login" :loading="userLoading">
            {{ isNew ? 'Create' : 'Login' }}
         </Button>

         <div class="extras">
            <p v-if="!isNew">Need an account?
               <router-link to="/login?type=new" replace>
                  <Button link>Create one.</Button>
               </router-link>
            </p>
            <p v-else>Have an account?
               <router-link to="/login" replace>
                  <Button link>Login.</Button>
               </router-link>
            </p>

            <Button v-if="!isNew" link>Forgot Password?</Button>
         </div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.page {
   height: 100vh;
   width: 100%;
   display: flex;

   .background {
      flex-grow: 1;
      background: linear-gradient(to bottom right, purple, pink);
   }

   .login-card {
      width: 360px;
      display: flex;
      flex-direction: column;
      align-items: left;
      padding: 20px 40px;
      box-shadow: -2px 0px 3px 0px rgba(0, 0, 0, 0.1), -1px 0px 2px 0px rgba(0, 0, 0, 0.06);

      .title {
         width: 100%;
         font-size: $font-lg;
         text-align: left;
      }

      .inputs {
         width: 100%;
         margin: 20px 0px;
      }

      .error {
         margin-bottom: 10px;
         font-size: $font-sm;
         color: $red;
         text-align: left;
      }

      .extras {
         width: 100%;
         display: flex;
         flex-direction: column;
         align-items: center;
         margin-top: 10px;
         font-size: $font-sm;

         button { font-weight: bold; }
      }
   }
}
</style>
