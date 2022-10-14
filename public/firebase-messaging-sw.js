importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js");

var firebaseConfig = {
  apiKey: "AIzaSyDqiUgwvlnfyU_HeZzXGKGzghyrqgPb7HM",
  authDomain: "bff-pwa.firebaseapp.com",
  projectId: "bff-pwa",
  storageBucket: "bff-pwa.appspot.com",
  messagingSenderId: "643240659175",
  appId: "1:643240659175:web:7545ef33d5be2b1d7f7a42",
};

const app = firebase.initializeApp(firebaseConfig);

app
  .messaging()
  .getToken({
    vapidKey:
      "BPuIv1RyInGZ6Qt19_ifUqd00Gfii9ETXbBlptBsfZcF5tsdnBlDNe3RooKunBxUmF38_R2IwbIBSOcR0rujAGU",
  });
