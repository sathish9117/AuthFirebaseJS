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
const usernameInput = document.getElementById("usernameInput");
const saveBtn = document.getElementById("saveBtn");
const storage = getStorage();

onAuthStateChanged(auth, (user) => {
  if (!user || !loggedInUserId) {
    window.location.href = "login.html";
  } else {
    getData();
  }
});

const logoutBtn = document.getElementById("btnLogout");

let checkCred = () => {
  if (!loggedInUserId) {
    window.location.href = "login.html";
    document.getElementById("not-found").innerText = "Not Found";
  }
};
window.addEventListener("load", checkCred);
if (logoutBtn) {
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
}

// Browse image
document.getElementById("imageUpload").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("profilePicHome").src = e.target.result;
    };
    reader.readAsDataURL(file);
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

async function updateName() {
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
  } catch (error) {
    alert("Failed to update name.");
  }
}

async function updateImage() {
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
  } catch (error) {
    console.error("Error uploading image:", error);
    alert("Failed to upload image.");
  }
}
if (saveBtn) {
  saveBtn.addEventListener("click", async () => {
    try {
      await updateName();
      await updateImage();
      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error);
      alert("⚠️ Failed to update profile. " + (error.message || ""));
    }
  });
}
