import { auth, db } from "./firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import {
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const signIn = document.getElementById("submitSignIn");
const loggedInUserId = localStorage.getItem("loggedInUserId");

signIn.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("lemail").value;
  const password = document.getElementById("lpwd").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Login successful");
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href = "home.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-credential") {
        console.log("Incorrect Email");
      } else {
        console.log("Account does not exists");
      }
    });
});

let checkCred = () => {
  if (!loggedInUserId) {
    // window.location.href = "register.html";
    // alert("9999 Not Log");
    console.log("Not Logged");
    document.getElementById("not-found").innerText = "Not Found";
  } else {
    console.log("999 Logged");
    window.location.href = "details.html";
    alert("665 Logged");
  }
};
window.addEventListener("load", checkCred);
