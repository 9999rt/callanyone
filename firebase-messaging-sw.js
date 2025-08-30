importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyB6DlOUHjusyCmyJ6x-HQLm1qQc2xuqFNSI",
  authDomain: "emrbaba-acb73.firebaseapp.com",
  projectId: "emrbaba-acb73",
  storageBucket: "emrbaba-acb73.appspot.com",
  messagingSenderId: "240458768537",
  appId: "1:240458768537:web:d34ea3a69084ec08cb1808",
  measurementId: "G-1YLMDERVRK",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
  });
});
