import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDV8Rhm1ib80rSlAPxKbvDVgGm2DAaRONY",
  authDomain: "kloud-61ad4.firebaseapp.com",
  projectId: "kloud-61ad4",
  storageBucket: "kloud-61ad4.appspot.com",
  messagingSenderId: "391950443801",
  appId: "1:391950443801:web:cd23dcd1f922420ea19188",
};
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
