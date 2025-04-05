function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("login-error");

  if (username === "praya@testmail.com" && password === "11111") {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    error.style.display = "none";
  } else {
    error.style.display = "block";
  }
}

function logout() {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("login-container").style.display = "block";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("login-error").style.display = "none";
}

function showSection(sectionId) {
  const sections = document.querySelectorAll(".content");
  sections.forEach((sec) => (sec.style.display = "none"));
  document.getElementById(sectionId).style.display = "block";
}
