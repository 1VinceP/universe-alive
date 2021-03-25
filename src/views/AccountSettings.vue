<script>
import { mapActions, mapState } from 'vuex';
import pickBy from 'lodash/pickBy';
import { Button, Input, Select } from '@/components/common';
import * as accountTypes from '@/constants/accountTypes.constants';

export default {
   name: 'account-settings',

   components: { Button, Input, Select },

   data() {
      return {
         username: '',
         email: '',
         password: '',
         password2: '',
         accountType: '',

         placeholders: {
            username: '',
            email: '',
            password: '',
         },
      };
   },

   created() {
      const { uid, password, accountType, ...user } = this.user;
      this.placeholders = user;
      this.accountType = accountType;
   },

   computed: {
      ...mapState('authentication', ['user', 'userUpdating']),

      accountTypeOptions() {
         return this.user.accountType === accountTypes.ADMIN ? accountTypes
            : accountTypes.filter(type => type !== accountTypes.ADMIN);
      },

      canSave() {
         const { username, email, password, password2, accountType } = this;
         const checkPassword = password ? password === password2 : false;
         return checkPassword || (username || email || accountType !== this.user.accountType);
      },
   },

   methods: {
      ...mapActions('authentication', ['updateUser']),

      async saveUpdates() {
         let updates = {
            username: this.username,
            accountType: this.accountType,
         };
         updates = pickBy(updates, value => !!value);
         await this.updateUser({ uid: this.user.uid, data: updates, returnUser: true });
      },
   },
};
</script>

<template>
   <div class="account-settings">
      <div class="column">
         <Input v-model="username" label="Username" :placeholder="placeholders.username" />
         <Input v-model="email" label="email" :placeholder="placeholders.email" details="Currently unavailable" disabled />
         <Input v-model="password" label="Password" placeholder="xxxxxx" details="Currently unavailable" password disabled />
         <Input v-model="password2" label="Retype Password" details="Currently unavailable" password disabled />
         <Select v-model="accountType" label="Account Type" class="select" noDefault disabled>
            <option v-for="type in accountTypeOptions" :key="type" :value="type">
               {{ type }}
            </option>
         </Select>

         <div class="buttons">
            <Button @click="$router.go(-1)" secondary>Cancel</Button>
            <Button :disabled="!canSave" :loading="userUpdating" @click="saveUpdates">Save</Button>
         </div>
      </div>
      <!-- <div class="column" /> -->
   </div>
</template>

<style lang="scss" scoped>
.account-settings {
   height: calc(100vh - #{$header-height});
   width: 100%;
   background: linear-gradient(to bottom right, white, lightblue);
   display: flex;
   justify-content: center;
   padding: 40px 0px;

   .column {
      width: 350px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0px;
      // &:first-child { border-right: 1px solid $grey; }

      .select, option {
         text-transform: capitalize;
      }

      .buttons {
         width: 260px;
         display: flex;
         justify-content: space-between;
      }
   }
}
</style>
