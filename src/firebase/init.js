import firebase from 'firebase'
import firestore from 'firebase/firestore'

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

export default firebaseApp
