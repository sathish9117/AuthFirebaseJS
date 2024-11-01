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
const userData = document.getElementById("user-data");
onAuthStateChanged(auth, (user) => {
  console.log(loggedInUserId);
  checkCred();
  if (loggedInUserId) {
    getData();
    // window.location.href = "index.html"; // Redirect to index page
    // alert("552 Logged");
  } else {
    console.log("User Id Not Found in local storage");
    window.location.href = "login.html"; // Redirect to login page
    // alert("289 Logged");
  }
});

const logoutBtn = document.getElementById("btnLogout");

let checkCred = () => {
  if (!loggedInUserId) {
    window.location.href = "login.html";
    // alert("9999 Not Log");
    console.log("Not Logged");
  } else {
    console.log("999 Logged");

    // alert("665 Logged");
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
        document.getElementById("loggedUserNameTitle").innerText =
          userData.username;
        document.getElementById("profilePic").src = userData.imageUrl;
        document.getElementById("profilePicHome").src = userData.imageUrl;
        document.getElementById("loggedUserEmail").innerText = userData.email;
        console.log("userData", userData.imageUrl);
      } else {
        console.log("no document found matching id");
      }
    })
    .catch((error) => {
      console.log("Error getting Document", error);
    });
}
