import { auth } from "./firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const signInButton = document.getElementById("submitSignIn");
const loadingIndicator = document.getElementById("loading");

signInButton.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("lemail").value.trim();
  const password = document.getElementById("lpwd").value.trim();

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  // Show loading
  loadingIndicator.style.display = "block";

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href = "home.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (
        errorCode === "auth/user-not-found" ||
        errorCode === "auth/wrong-password"
      ) {
        alert("Incorrect email or password.");
      } else {
        alert("Login failed. Please try again.");
      }
      console.error(error);
    })
    .finally(() => {
      // Hide loading regardless of success or failure
      loadingIndicator.style.display = "none";
    });
});

// Optional: Check login status after successful login
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.uid);
    localStorage.setItem("loggedInUserId", user.uid);
  } else {
    console.log("User is not logged in.");
  }
});
