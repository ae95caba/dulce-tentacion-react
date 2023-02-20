import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { auth } from "../backend/firebase";
import { useNavigate } from "react-router-dom";
export function GoogleAuth(props) {
  const navigate = useNavigate();
  return (
    <button
      id="google-auth"
      onClick={(e) => {
        alert("click google");
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            console.log("te logeaste con google");

            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            navigate("/perfil");
            console.log("usenavigate previous line");
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
      {props.text}
    </button>
  );
}
