// Firebase importları
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDocs, query, where, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6DIOuHjusyCmyJ6x-HQLmiQc2xuqFNSI",
  authDomain: "emrbaba-acb73.firebaseapp.com",
  projectId: "emrbaba-acb73",
  storageBucket: "emrbaba-acb73.firebasestorage.app",
  messagingSenderId: "240458768537",
  appId: "1:240458768537:web:d34ea3a69084ec08cb1808",
  measurementId: "G-1YLMDEVRVK"
};

// Başlat
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ------------------ Arkadaş Ekle ------------------
async function sendFriendRequest() {
  const user = auth.currentUser;
  if (!user) {
    alert("Önce giriş yapmalısın!");
    return;
  }

  const toUsername = document.getElementById("friendUsername").value.trim();
  if (!toUsername) return;

  // istek kaydet
  await setDoc(doc(collection(db, "friendRequests")), {
    from: user.uid,
    fromUsername: user.displayName || "Bilinmiyor",
    toUsername: toUsername,
    status: "pending",
    createdAt: Date.now()
  });

  alert("Arkadaşlık isteği gönderildi!");
}

// ------------------ İstekleri Listele ------------------
async function loadFriendRequests() {
  const user = auth.currentUser;
  if (!user) return;

  const q = query(
    collection(db, "friendRequests"),
    where("toUsername", "==", user.displayName),
    where("status", "==", "pending")
  );

  const querySnapshot = await getDocs(q);
  const requestsDiv = document.getElementById("friendRequests");
  requestsDiv.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const request = docSnap.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${request.fromUsername} sana arkadaşlık isteği gönderdi</p>
      <button onclick="acceptFriendRequest('${docSnap.id}', '${request.from}', '${request.fromUsername}')">Kabul Et</button>
      <button onclick="rejectFriendRequest('${docSnap.id}')">Reddet</button>
    `;
    requestsDiv.appendChild(div);
  });
}

// ------------------ Kabul Et ------------------
async function acceptFriendRequest(requestId, fromUserId, fromUsername) {
  const user = auth.currentUser;
  if (!user) return;

  await updateDoc(doc(db, "friendRequests", requestId), {
    status: "accepted"
  });

  // Friends koleksiyonuna ekle
  await setDoc(doc(db, "friends", `${user.uid}_${fromUserId}`), {
    users: [user.uid, fromUserId],
    usernames: [user.displayName, fromUsername]
  });

  await setDoc(doc(db, "friends", `${fromUserId}_${user.uid}`), {
    users: [fromUserId, user.uid],
    usernames: [fromUsername, user.displayName]
  });

  alert("Arkadaşlık isteğini kabul ettin!");
  loadFriendRequests();
}

// ------------------ Reddet ------------------
async function rejectFriendRequest(requestId) {
  await updateDoc(doc(db, "friendRequests", requestId), {
    status: "rejected"
  });
  alert("Arkadaşlık isteğini reddettin!");
  loadFriendRequests();
}

// ------------------ Kullanıcı login olduğunda istekleri yükle ------------------
onAuthStateChanged(auth, (user) => {
  if (user) {
    loadFriendRequests();
  }
});

// Fonksiyonları global yap
window.sendFriendRequest = sendFriendRequest;
window.acceptFriendRequest = acceptFriendRequest;
window.rejectFriendRequest = rejectFriendRequest;
