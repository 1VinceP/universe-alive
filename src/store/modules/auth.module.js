import firebase from 'firebase';
import * as accountTypes from '@/constants/accountTypes.constants';

export default {
   namespaced: true,

   state: {
      user: {
         username: 'Test User',
         uid: '10',
         accountType: 'admin',
         email: 'dev@email.com',
      },
      authError: '',
      userError: '',
      userLoading: false,
      userUpdating: false,
   },

   getters: {
      isAdmin: state => state.user.accountType === accountTypes.ADMIN,
   },

   actions: {
      async registerUser({ state }, { email, password, username, persist }) {
         state.userLoading = true;

         try {
            const currentDate = new Date().toJSON();
            const user = {
               email,
               username: username || email.split('@')[0],
               accountType: 'basic',
               lastLogin: currentDate,
               createdOn: currentDate,
            };

            const persistType = persist ? firebase.auth.Auth.Persistence.LOCAL
               : firebase.auth.Auth.Persistence.SESSION;
            await firebase.auth().setPersistence(persistType);

            const { user: { uid } } = await firebase.auth().createUserWithEmailAndPassword(email, password);
            await firebase.database().ref(`users/${uid}`).set(user);

            state.user = { ...user, uid };
            state.userLoading = false;
            return true;
         } catch (error) {
            state.authError = error.message;
            state.userLoading = false;
            return false;
         }
      },

      async loginUser({ state, dispatch }, { email, password }) {
         state.userLoading = true;
         try {
            const { user: { uid } } = await firebase.auth().signInWithEmailAndPassword(email, password);

            const updateSuccessful = await dispatch('updateUser', {
               uid,
               data: { lastLogin: new Date().toJSON() },
            });
            if (!updateSuccessful) throw new Error({ message: 'User update failed' });

            const appUser = await firebase.database().ref(`users/${uid}`).once('value');

            state.user = { ...appUser.val(), uid };
            state.userLoading = false;
            return true;
         } catch (error) {
            state.authError = error.message;
            state.userLoading = false;
            return false;
         }
      },

      async updateUser({ state }, { uid, data }) {
         state.userUpdating = true;
         try {
            await firebase.database().ref(`users/${uid}`).update(data);
            state.userUpdating = false;
            return true;
         } catch (error) {
            state.userError = error;
            state.userUpdating = false;
            return false;
         }
      },

      async logoutUser({ state }) {
         try {
            await firebase.auth().signOut();
            state.user = {};
            return true;
         } catch (error) {
            return false;
         }
      },
   },
};
