import { createApp } from 'vue';
import firebase from 'firebase/app';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { clickOutside } from './directives';
import './reset.css';

const firebaseConfig = {
   apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
   authDomain: process.env.VUE_APP_FIREBASE_API_KEY,
   projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
   storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.VUE_APP_FIREBASE_APP_ID,
   measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
   databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
};
firebase.initializeApp(firebaseConfig);

const app = createApp(App);

app.directive('click-outside', clickOutside);
app.use(store).use(router).mount('#app');
