import { auth, db } from "./firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const signUp = document.getElementById("submitSignUp");
const loggedInUserId = localStorage.getItem("loggedInUserId");

// Event listener for signup from submission
signUp.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("hello", event);
  const email = document.getElementById("semail").value;
  const pwd = document.getElementById("spwd").value;
  const username = document.getElementById("sname").value;

  signUpUser(email, pwd, username);
});
function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}
// Main signup function
async function signUpUser(email, password, username) {
  try {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log(userCredential);

        const user = userCredential.user;
        console.log("User: ", user);
        console.log("User UID: ", user.uid); // Log user UID
        const userData = {
          email: email,
          username: username,
          uid: user.uid,
          imageUrl: "",
        };
        const docRef = doc(db, "users", user.uid);
        console.log("User Data: ", docRef);
        setDoc(docRef, userData)
          .then(() => {
            console.log("Data stored");
            window.location.href = "login.html";
          })
          .catch((error) => {
            console.log("Error Writing", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode == "auth/email-already-in-use") {
          // showMessage("Email Address Already Exists !!!");
          console.log("Email Address Already Exists !!!");
        } else {
          // showMessage("unable to create user", "signUpMessage");
          console.log("unable to create user", "signUpMessage");
        }
      });
  } catch (error) {
    console.log("Signup failed: ", error.message);
  }
}
let checkCred = () => {
  if (!loggedInUserId) {
    // window.location.href = "register.html";
    // alert("9999 Not Log");
    console.log("Not Logged");
  } else {
    console.log("999 Logged");
    window.location.href = "details.html";
    alert("665 Logged");
  }
};
window.addEventListener("load", checkCred);
