import { auth, db } from "./firebaseConfig.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const loggedInUserId = localStorage.getItem("loggedInUserId");
const navBtns = document.getElementById("nav-btns");
const userData = document.getElementById("user-data");
const logoutBtn = document.getElementById("btnLogout");

// Check if user is logged in and show/hide elements accordingly
onAuthStateChanged(auth, (user) => {
  if (loggedInUserId) {
    getData();
    navBtns.style.display = "none"; // Hide navBtns
    userData.style.display = "block"; // Show user data
    console.log("User is logged in.");
  } else {
    console.log("User Id Not Found in local storage");
    window.location.href = "login.html"; // Redirect to login page if not logged in
  }
});

// Run checkCred on page load to ensure navigation visibility
window.addEventListener("load", () => {
  if (!loggedInUserId) {
    window.location.href = "login.html";
    console.log("Not Logged");
  } else {
    userData.style.display = "block";
    navBtns.style.display = "none";
    console.log("Logged");
  }
});

// Logout function
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUserId");
  signOut(auth)
    .then(() => {
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Error Signing out: ", error);
    });
});

// Fetch user data from Firestore
function getData() {
  const docRef = doc(db, "users", loggedInUserId);

  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        document.getElementById("loggedUserName").innerText = userData.username;
        document.getElementById("loggedUserEmail").innerText = userData.email;
        console.log("User data loaded:", userData.email);
      } else {
        console.log("No document found matching ID.");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

// Toggle visibility of navBtns and userData
function toggleNavBtns() {
  if (userData.style.display === "none") {
    navBtns.style.display = "none"; // Hide navBtns
    userData.style.display = "block"; // Show user data
  } else {
    navBtns.style.display = "block"; // Show navBtns
    userData.style.display = "none"; // Hide user data
  }
}
