// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCDhe5vjeiKZWH4yqqrbOBxzy33doX_6vg",
  authDomain: "reelsmix-9c6b1.firebaseapp.com",
  databaseURL: "https://reelsmix-9c6b1-default-rtdb.firebaseio.com",
  projectId: "reelsmix-9c6b1",
  storageBucket: "reelsmix-9c6b1.appspot.com",
  messagingSenderId: "180909739507",
  appId: "1:180909739507:web:37d670f7968ae10d34d686",
  measurementId: "G-9N6RFPTK1W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export initialized services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
