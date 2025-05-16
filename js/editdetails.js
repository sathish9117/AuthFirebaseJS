import { auth, db } from "./firebaseConfig.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

const loggedInUserId = localStorage.getItem("loggedInUserId");
const imageInput = document.getElementById("imageUpload");
const uploadBtn = document.getElementById("uploadImageBtn");
const updateNameBtn = document.getElementById("updateNameBtn");
const usernameInput = document.getElementById("usernameInput");
const storage = getStorage();

uploadBtn.addEventListener("click", async () => {
  const file = imageInput.files[0];
  if (!file) {
    alert("Please select an image file.");
    return;
  }

  const storageRef = ref(storage, `profilePictures/${loggedInUserId}.jpg`);

  try {
    // Upload image to Firebase Storage
    await uploadBytes(storageRef, file);

    // Get the URL of the uploaded file
    const downloadURL = await getDownloadURL(storageRef);

    // Update the user document in Firestore
    const userRef = doc(db, "users", loggedInUserId);
    await updateDoc(userRef, {
      imageUrl: downloadURL,
    });

    // Update profile images on page
    document.getElementById("profilePic").src = downloadURL;
    document.getElementById("profilePicHome").src = downloadURL;

    alert("Image uploaded successfully!");
  } catch (error) {
    console.error("Error uploading image:", error);
    alert("Failed to upload image.");
  }
});

onAuthStateChanged(auth, (user) => {
  console.log("logged user", loggedInUserId);

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
    console.log("logged user", loggedInUserId);

    document.getElementById("not-found").innerText = "Not Found";
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

updateNameBtn.addEventListener("click", async () => {
  const newName = usernameInput.value.trim();

  if (!newName) {
    alert("Please enter a valid name.");
    return;
  }

  try {
    const userRef = doc(db, "users", loggedInUserId);
    await updateDoc(userRef, {
      username: newName,
    });

    document.getElementById("loggedUserNameTitle").innerText = newName;
    alert("Name updated successfully!");
  } catch (error) {
    console.error("Error updating name:", error);
    alert("Failed to update name.");
  }
});

function getData() {
  const docRef = doc(db, "users", loggedInUserId);
  console.log(docRef);

  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();

        document.getElementById("loggedUserNameTitle").innerText =
          userData.username;
        usernameInput.value = userData.username;
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
