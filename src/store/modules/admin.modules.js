import ky from 'ky';

export default {
   data: {
      adminDash: {},
      loadingAdminDash: false,
   },

   actions: {
      async getAdminDash({ state }) {
         state.loadingAdminDash = true;
         try {
            const adminDash = await ky.get('/admin/dash').json();
            state.adminDash = adminDash;
            return true;
         } catch (error) {
            console.log(error);
            return false;
         }
      },
   },
};
