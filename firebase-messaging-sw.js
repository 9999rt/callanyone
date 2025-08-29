// firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyB6DIOuHjusyCmyJ6x-HQLmiQc2xuqFNSI",
  authDomain: "emrbaba-acb73.firebaseapp.com",
  projectId: "emrbaba-acb73",
  storageBucket: "emrbaba-acb73.appspot.com",
  messagingSenderId: "676580712565",
  appId: "1:676580712565:web:ba34f41a8cb7cfb7e8f88c",
  measurementId: "G-50X5EMX98Y"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Arka planda gelen bildirim
messaging.onBackgroundMessage((payload) => {
  console.log("📩 Arka planda bildirim:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
  });
});
