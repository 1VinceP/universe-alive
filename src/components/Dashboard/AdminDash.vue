<script>
import { mapActions } from 'vuex';
import Nav, { NavTab } from '../Nav';

export default {
   name: 'admin-dash',

   components: { Nav, NavTab },

   created() {
      this.getAdminDash();
   },

   methods: {
      ...mapActions('admin', ['getAdminDash']),
   },
};
</script>

<template>
   <div class="admin-dashboard">
      <Nav>
         <NavTab to="/dashboard/admin">Admin Dashboard</NavTab>
         <NavTab to="/dashboard">Dashboard</NavTab>
         <NavTab to="/guides">Guides</NavTab>
      </Nav>
   </div>
</template>

<style lang="scss" scoped>

</style>
