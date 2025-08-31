const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Firebase Admin başlat (ENV değişkenlerinden)
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
  }),
});

// Mesaj gönderme endpoint
app.post("/send-message", async (req, res) => {
  const { to, message, from } = req.body;

  if (!to || !message) {
    return res.status(400).send({ error: "Eksik parametre" });
  }

  try {
    const userToken = to; // Normalde DB’den alırsın

    const payload = {
      notification: {
        title: `Yeni mesaj - ${from || "Bilinmeyen"}`,
        body: message,
        icon: "/icon.png",
      },
    };

    await admin.messaging().sendToDevice(userToken, payload);
    console.log("📩 Bildirim gönderildi:", message);

    res.send({ success: true });
  } catch (err) {
    console.error("❌ Bildirim hatası:", err);
    res.status(500).send({ error: "Bildirim gönderilemedi" });
  }
});

// Server başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor`);
});
