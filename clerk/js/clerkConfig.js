window.addEventListener("load", async function () {
  await Clerk.load();
  console.log(Clerk.load());

  if (Clerk.user) {
    const userButtonDiv = document.getElementById("user-button");
    console.log(userButtonDiv);

    Clerk.mountUserButton(userButtonDiv);
  } else {
    const signInDiv = document.getElementById("sign-in");
    // console.log(signInDiv);

    Clerk.mountSignIn(signInDiv);
    console.log(Clerk);
  }
});
