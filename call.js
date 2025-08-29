let localStream;
let remoteStream;

function startCall(friend, type) {
  document.getElementById("callScreen").style.display = "flex";
  document.getElementById("callStatus").innerText = `${friend} ile ${type === 'voice' ? 'Sesli' : 'Görüntülü'} Arama...`;

  navigator.mediaDevices.getUserMedia({
    video: type === "video",
    audio: true
  }).then(stream => {
    localStream = stream;
    document.getElementById("localVideo").srcObject = stream;
  }).catch(err => {
    alert("Kamera/Mikrofon izni gerekli: " + err);
  });
}

function startGroupCall(groupName) {
  document.getElementById("callScreen").style.display = "flex";
  document.getElementById("callStatus").innerText = `${groupName} grubunda arama...`;
}

function acceptCall() {
  document.getElementById("callStatus").innerText = "Bağlanıyor...";
  // İleride buraya gerçek WebRTC bağlantısı eklenecek
}

function endCall() {
  document.getElementById("callScreen").style.display = "none";
  if(localStream){
    localStream.getTracks().forEach(track => track.stop());
  }
}
