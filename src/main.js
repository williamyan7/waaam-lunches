// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import firebase from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import VueFire from 'vuefire'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueFire)

var config = {
    apiKey: "AIzaSyBC2n9FWwf8ETP5qlXnO7ULxDbrf7Bz9e8",
    authDomain: "waaam-lunches-a1d47.firebaseapp.com",
    databaseURL: "https://waaam-lunches-a1d47.firebaseio.com",
    projectId: "waaam-lunches-a1d47",
    storageBucket: "waaam-lunches-a1d47.appspot.com",
    messagingSenderId: "787345928970"
  };

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

/* eslint-disable no-new */
const unsubscribe = firebase.auth().onAuthStateChanged(user => {
  new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })
  unsubscribe()
})
