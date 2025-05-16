import { auth } from "./firebaseConfig.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const forgotPassword = document.getElementById("forgot-btn");
const email = document.getElementById("email").value;
console.log("Forgot");
console.log(email);

const restPassword = () => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("A Password Rest Link has been sent your email");
    })
    .catch((error) => {
      alert("does'nt exists user", error.code);
      console.log(error.code);
      console.log(error.message);
      console.log("clicked");
    });
  console.log("clicked");
};
forgotPassword.addEventListener("click", restPassword);
