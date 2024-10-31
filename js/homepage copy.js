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
onAuthStateChanged(auth, (user) => {
  console.log(loggedInUserId);
  if (loggedInUserId) {
    getData();
    userData.style.display = "block"; // Hides the navBtns, but space remains
    console.log("block");

    // window.location.href = "admin.html"; // Redirect to index page
  } else {
    console.log("User Id Not Found in local storage");
    // window.location.href = "login.html"; // Redirect to login page
  }
});

const logoutBtn = document.getElementById("btnLogout");

let checkCred = () => {
  if (!loggedInUserId) {
    window.location.href = "login.html";
    console.log("Not Logged");
  } else {
    userData.style.display = "block"; // Hides the navBtns, but space remains
    console.log("Logged");
  }
};
window.addEventListener("load", checkCred);
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

function getData() {
  const docRef = doc(db, "users", loggedInUserId);
  console.log(docRef);

  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        document.getElementById("loggedUserName").innerText = userData.username;
        document.getElementById("loggedUserEmail").innerText = userData.email;
        console.log("userData", userData.email);
      } else {
        console.log("no document found matching id");
      }
    })
    .catch((error) => {
      console.log("Error getting Document", error);
    });
}

function NavBtns() {
  if (userData.style.visibility === "none") {
    navBtns.style.visibility = "block"; // Makes the navBtns visible
    userData.style.visibility = "none"; // Makes the navBtns visible
  } else {
    navBtns.style.visibility = "none"; // Hides the navBtns, but space remains
  }
}
