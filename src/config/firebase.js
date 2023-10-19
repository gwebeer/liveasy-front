import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

let firebaseConfig = {
  apiKey: "AIzaSyAS4tGJiCewf1HzqyDTxBD9Y3d-yHvR7FU",
  authDomain: "studio-aroucha.firebaseapp.com",
  projectId: "studio-aroucha",
  storageBucket: "studio-aroucha.appspot.com",
  messagingSenderId: "35802064475",
  appId: "1:35802064475:web:acfa7658a9908f0008c17e",
  measurementId: "G-PE5Z8DVJLD"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase;