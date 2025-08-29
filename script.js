// Firebase config kısmın aynı kalacak...

// Bildirim izni sadece 1 kere sorulsun
async function askPermissionOnce() {
  if (Notification.permission === "default") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("✅ Bildirim izni verildi.");
      getToken();
    } else {
      console.log("❌ Bildirim izni reddedildi.");
    }
  } else if (Notification.permission === "granted") {
    console.log("✅ Daha önce izin verilmiş.");
    getToken();
  } else {
    console.log("❌ Kullanıcı izin vermemiş.");
  }
}

// Token al
async function getToken() {
  try {
    const token = await messaging.getToken({ vapidKey: "SENİN_PUBLIC_VAPID_KEYİN" });
    console.log("📩 Token:", token);
  } catch (err) {
    console.error("Token alınamadı:", err);
  }
}

// Sayfa yüklenince 1 kere çalıştır
window.onload = askPermissionOnce;
