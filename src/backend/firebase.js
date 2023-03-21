// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8cyB4MPpQjczL2XlHLx_ilo-SPZkwja4",
  authDomain: "kiosko-rayito.firebaseapp.com",
  projectId: "kiosko-rayito",
  storageBucket: "kiosko-rayito.appspot.com",
  messagingSenderId: "993224014840",
  appId: "1:993224014840:web:38f67b5fccee0d0186f40d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage();

export const db = getFirestore(app);

///////////////////////////////////////////

/* const signupform = document.querySelector("#signup-form");

signupform.addEventListener("submit", (e) => {
  e.preventDefault();
  const signupEmail = document.getElementById("signup-email").value;
  const signupPassword = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, signupEmail, signupPassword).then(
    (userCredential) => {
      alert("sign up");
    }
  );
}); */

////////////////////////////////////////////////////////////////////////

/* const loginform = document.querySelector("#login-form");

loginform.addEventListener("submit", (e) => {
  e.preventDefault();
  const loginEmail = document.getElementById("login-email").value;
  const loginPassword = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      alert("te loggeaste perro");
    })
    .catch((error) => {
      console.log(error.message);
    });
}); */

////////////////////////////////////////////////////////////////////////

/* const logout = document.getElementById("logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      console.log("saliste perri");
    })
    .catch((error) => {
      console.log(error.message);
    });
});
 */
////////////////////////////////////////////
//subscribing to auth state changes

/* auth.onAuthStateChanged((user) => {
  alert("auth state lisener");
  if (user) {
    console.log("hay un usuario logeado");
    console.log(user);
  } else {
    console.log("no hay un usuario activo");
  }
}); */

////////////////////////////////////////////

/* const docs = await getDocs(collection(fs, "helados"));
console.log(docs); */

////////////////////////////////////

// google login

/* const provider = new GoogleAuthProvider();

const googleButton = document.getElementById("googleLogin");
googleButton.addEventListener("click", (e) => {
  alert("click google");
  signInWithRedirect(auth, provider)
    .then((result) => {
      console.log("te logeaste con google");
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      console.log(error.message);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}); */

/////////////////////////////////////////////

/* function userinfo() {
  const user = auth.currentUser;
  console.log(user);
  if (user !== null) {
    // The user object has basic properties
    // such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const uid = user.uid;
    alert(email);
  }
}

setTimeout(() => {
  alert("timeout");
  userinfo();
}, 3000); */
