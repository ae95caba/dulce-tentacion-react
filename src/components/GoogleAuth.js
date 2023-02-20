import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { auth } from "../backend/firebase";

export function GoogleAuth() {
  return (
    <div id="google-auth">
      <p>O inicia secion con google:</p>
      <button
        onClick={(e) => {
          alert("click google");
          const provider = new GoogleAuthProvider();
          signInWithPopup(auth, provider)
            .then((result) => {
              console.log("te logeaste con google");
              document.getElementById("sign-up-log-in").style.display = "none";
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential =
                GoogleAuthProvider.credentialFromResult(result);
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
        }}
      >
        Google
      </button>
    </div>
  );
}
