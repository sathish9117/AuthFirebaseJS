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

signIn.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("lemail").value;
  const password = document.getElementById("lpwd").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Login successful");
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href = "index.html";
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
