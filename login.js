document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username && password === "1234") {
    localStorage.setItem("user", JSON.stringify({ username }));
    window.location.href = "index.html";
  } else {
    alert("❌ Hatalı giriş!");
  }
});
