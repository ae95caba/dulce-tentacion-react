import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { auth } from "../backend/firebase";

export function LogIn() {
  return (
    <form
      id="log-in"
      action=""
      onSubmit={(e) => {
        e.preventDefault();

        const email = document.getElementById("log-in-email").value;
        const password = document.getElementById("log-in-password").value;

        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            alert("sign up");
          })
          .catch((error) => {
            console.log(error.message);
          });
        document.getElementById("log-in").style.display = "none";
        document.getElementById("log-in-email").value = "";
        document.getElementById("log-in-password").value = "";
      }}
    >
      <fieldset>
        <legend>Ya tienes cuenta?</legend>
        <label htmlFor="log-in-email">Email:</label>
        <input type="email" id="log-in-email" />
        <label htmlFor="log-in-password">Contrasenia:</label>
        <input type="password" id="log-in-password" />
        <button type="submit">Iniciar secion</button>
      </fieldset>
    </form>
  );
}
