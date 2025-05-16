import { db } from "./firebaseConfig.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const userList = document.getElementById("userList");

async function fetchUsers() {
  try {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);

    querySnapshot.forEach((doc) => {
      const user = doc.data();

      const userCard = document.createElement("div");
      userCard.className = "user-card";

      userCard.innerHTML = `
        <img src="${user.imageUrl || "./images/person.svg"}" alt="User Image">
        <h3>${user.username || "No Name"}</h3>
        
        <button type="button" class="signup-btn">${"Add"}</button>
      `;

      userList.appendChild(userCard);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    userList.innerHTML = "<p>Error loading users.</p>";
  }
}

fetchUsers();
