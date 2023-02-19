import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { auth } from "../backend/firebase";

export function SignUp() {
  return (
    <form
      id="sign-up"
      action=""
      onSubmit={(e) => {
        e.preventDefault();

        const email = document.getElementById("sign-up-email").value;
        const password = document.getElementById("sign-up-password").value;

        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            alert("sign up");
          })
          .catch((error) => {
            console.log(error.message);
          });
        document.getElementById("sign-up").style.display = "none";
        document.getElementById("sign-up-email").value = "";
        document.getElementById("sign-up-password").value = "";
      }}
    >
      <fieldset>
        <legend>No tienes cuenta ?</legend>
        <label htmlFor="sign-up-email">Email:</label>
        <input type="email" id="sign-up-email" />
        <label htmlFor="sign-up-password">Contrasenia:</label>
        <input type="password" id="sign-up-password" />
        <button type="submit">Crear cuenta</button>
      </fieldset>
    </form>
  );
}
