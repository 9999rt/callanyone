// =====================
// Firebase Config
// =====================
const firebaseConfig = {
  apiKey: "AIzaSyB6DlOUHjusyCmyJ6x-HQLm1qQc2xuqFNSI",
  authDomain: "emrbaba-acb73.firebaseapp.com",
  projectId: "emrbaba-acb73",
  storageBucket: "emrbaba-acb73.appspot.com",
  messagingSenderId: "240458768537",
  appId: "1:240458768537:web:d34ea3a69084ec08cb1808",
  measurementId: "G-1YLMDERVRK"
};

// Firebase başlat
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Login kontrolü
if (!localStorage.getItem("user")) {
  if (!window.location.href.includes("login.html")) {
    window.location.href = "login.html";
  }
}

// Bildirim izni
async function askPermissionOnce() {
  if (Notification.permission === "default") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      getToken();
    }
  } else if (Notification.permission === "granted") {
    getToken();
  }
}

// Token alma
async function getToken() {
  try {
    const token = await messaging.getToken({
      vapidKey: "BH-tka-2V46X35H_kh0h4Ac4IugBPwhGWviOoMc_MQ_hKbZ6a5IyY8RbXStaNuU5arO41OiAPTr3Xuqp_UdYiuA"
    });
    console.log("📲 Kullanıcı token:", token);

    // Token’i kendi backend’ine kaydet (örnek: user=localStorage.getItem("user"))
    await fetch("http://localhost:3000/save-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: localStorage.getItem("user"), token })
    });
  } catch (err) {
    console.error("❌ Token alınamadı:", err);
  }
}

// Gelen bildirim
messaging.onMessage((payload) => {
  console.log("📩 Yeni bildirim:", payload);
  if (payload.notification) {
    new Notification(payload.notification.title, {
      body: payload.notification.body,
      icon: payload.notification.icon || "/icon.png"
    });
  }
});

// Çalıştır
askPermissionOnce();
