import { auth, db } from "./firebaseConfig.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const signUp = document.getElementById("submitSignUp");

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Event listener for signup from submission
signUp.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("hello", event);
  const email = document.getElementById("semail").value;
  const pwd = document.getElementById("spwd").value;
  const username = document.getElementById("sname").value;

  // createUserWithEmailAndPassword(auth, email, pwd).then((userCredential) => {
  //   console.log(userCredential);

  //   const user = userCredential.user;
  //   const userData = {
  //     email: email,
  //     username: username,
  //   };
  //   console.log("User Data: ", userData);

  //   showMessage("Account Created Successfully", "signUpMessage");
  //   // Store Data in CloudFire Store
  //   const docRef = setDoc(doc(db, "users", user.id));
  //   console.log(user.id);
  //   console.log("docRef: ", docRef);
  // });
  signUpUser(email, pwd, username);
});

// Function to create a new user in Firebase Auth

async function createUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw error;
  }
}

// Function to save user details to Firestore

function saveUserDataToFirestore(uid, username, email) {
  console.log("save", uid);

  // try {
  //   // Store user data in Firestore
  //   await db.collection("users").doc(uid).set({
  //     uid: uid,
  //     username: username,
  //     email: email,

  //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //   });
  //   console.log("User data added to Firestore");
  // } catch (error) {
  //   console.error("Error saving user data to Firestore:", error.message);
  // }
}

// Main signup function
async function signUpUser(email, password, username) {
  try {
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        console.log(userCredential);

        const user = userCredential.user;
        console.log("User: ", user);
        console.log("User UID: ", user.uid); // Log user UID
        const userData = {
          email: email,
          username: username,
        };
        console.log("User Data: ", userData);
      }
    );
  } catch (error) {
    console.log("Signup failed: ", error.message);
  }
}
