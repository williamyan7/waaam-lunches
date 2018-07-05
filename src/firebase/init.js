import firebase from 'firebase'
import firestore from 'firebase/firestore'

var config = {
      apiKey: "AIzaSyCngKxRLEngIXe1esCed-kzrJSmMWO9kYg",
      authDomain: "waaam-lunches.firebaseapp.com",
      databaseURL: "https://waaam-lunches.firebaseio.com",
      projectId: "waaam-lunches",
      storageBucket: "waaam-lunches.appspot.com",
      messagingSenderId: "715790750822"
  };

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp
