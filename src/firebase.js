import firebase from "firebase/app";
import "firebase/firebase-messaging";

var firebaseConfig = {
  apiKey: "AIzaSyDqiUgwvlnfyU_HeZzXGKGzghyrqgPb7HM",
  authDomain: "bff-pwa.firebaseapp.com",
  projectId: "bff-pwa",
  storageBucket: "bff-pwa.appspot.com",
  messagingSenderId: "643240659175",
  appId: "1:643240659175:web:7545ef33d5be2b1d7f7a42",
};

firebase.initializeApp(firebaseConfig);
export default firebase.messaging();
