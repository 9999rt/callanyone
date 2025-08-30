const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Firebase Admin başlat
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Mesaj gönderme endpoint
app.post("/send-message", async (req, res) => {
  const { to, message, from } = req.body;

  if (!to || !message) {
    return res.status(400).send({ error: "Eksik parametre" });
  }

  try {
    // hedef kullanıcının tokenini DB’den çekmen lazım (örnek kodda sabit yazdım)
    const userToken = to; // normalde DB’den alırsın

    const payload = {
      notification: {
        title: `Yeni mesaj - ${from}`,
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
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor`);
});
