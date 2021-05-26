import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAC4xicJPu6qd5_ZJvRe125Hw8nRKPYcDM",
  authDomain: "udemy-vue-firebase-sites-aa2df.firebaseapp.com",
  projectId: "udemy-vue-firebase-sites-aa2df",
  storageBucket: "udemy-vue-firebase-sites-aa2df.appspot.com",
  messagingSenderId: "132076559861",
  appId: "1:132076559861:web:b534482f0e8afdba2414bc",
};

// init firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { db, auth, timestamp };
