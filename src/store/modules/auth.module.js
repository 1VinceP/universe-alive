import firebase from 'firebase';
import ky from 'ky';
import * as accountTypes from '@/constants/accountTypes.constants';

export default {
   namespaced: true,

   state: {
      user: {
         username: '',
         uid: '',
         email: '',
         accountType: '',
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
      async loginToServer(_, { uid, remember }) {
         try {
            await ky.post('/auth/login', { json: { uid, remember } });
         } catch (error) {
            console.log(error);
         }
      },

      async registerUser({ state, dispatch }, { email, password, username, persist }) {
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

            await dispatch('loginToServer', { uid, remember: persist });

            state.user = { ...user, uid };
            state.userLoading = false;
            return true;
         } catch (error) {
            state.authError = error.message;
            state.userLoading = false;
            return false;
         }
      },

      async loginUser({ state, dispatch }, { email, password, persist }) {
         state.userLoading = true;
         try {
            const { user: { uid } } = await firebase.auth().signInWithEmailAndPassword(email, password);

            const data = { lastLogin: new Date().toJSON() };
            const updateSuccessful = await dispatch('updateUser', { uid, data });
            if (!updateSuccessful) throw new Error({ message: 'User update failed' });

            const appUser = await firebase.database().ref(`users/${uid}`).once('value');

            await dispatch('loginToServer', { uid, remember: persist });

            state.user = { ...appUser.val(), uid };
            state.userLoading = false;
            return true;
         } catch (error) {
            state.authError = error.message;
            state.userLoading = false;
            return false;
         }
      },

      async checkSession({ state }) {
         if (state.user.uid) return true;

         try {
            const { uid } = await ky('/auth/session').json();
            if (uid) {
               const appUser = await firebase.database().ref(`users/${uid}`).once('value');
               state.user = { ...appUser.val(), uid };
               return uid;
            } else {
               return false;
            }
         } catch (error) {
            console.error(error);
            return false;
         }
      },

      async updateUser({ state }, { uid, data, returnUser }) {
         state.userUpdating = true;
         try {
            await firebase.database().ref(`users/${uid}`).update(data);

            if (returnUser) {
               const appUser = await firebase.database().ref(`users/${uid}`).once('value');
               state.user = { ...appUser.val(), uid };
            }

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
            await ky.post('/auth/logout');
            state.user = {};
            return true;
         } catch (error) {
            return false;
         }
      },
   },
};
