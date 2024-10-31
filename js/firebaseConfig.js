// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKMpIZMuiYdWQ8dD5hXc6i2dY-lTNAb_8",
  authDomain: "quotesapp-67706.firebaseapp.com",
  projectId: "quotesapp-67706",
  storageBucket: "quotesapp-67706.appspot.com",
  messagingSenderId: "99684729392",
  appId: "1:99684729392:web:805094d43b7e4f75bba3f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export initialized services for reuse

export const auth = getAuth(app);
export const db = getFirestore(app);

// SignUp Function

// const signUp = document.getElementById("submitSignUp");
// console.log("welcome");

// signUp.addEventListener("click", (event) => {
//   event.preventDefault();
//   console.log("hello", event);
//   const email = document.getElementById("semail").value;
//   const pwd = document.getElementById("spwd").value;
//   const username = document.getElementById("sname").value;

//   console.log(username);
//   console.log(email);
//   console.log(pwd);
//   const db = getFirestore();
//   console.log("database", db);
//   console.log("552");
//   const auth = getAuth();

//   console.log(auth);
// });
// function observeUser() {
//   const redirectTo = (url) => {
//     window.location.href = url;
//   };
