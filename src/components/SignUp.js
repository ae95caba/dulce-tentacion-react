import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebase";
import { Link } from "react-router-dom";
import { GoogleAuth } from "./GoogleAuth";
import { useNavigate } from "react-router-dom";
export function SignUp() {
  const navigate = useNavigate();
  return (
    <div className="form-container">
      <form
        id="sign-up"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          const email = document.getElementById("sign-up-email").value;
          const password = document.getElementById("sign-up-password").value;
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              navigate("/perfil");
              alert("sign up");
            })
            .catch((error) => {
              console.log(error.message);
            });
          document.getElementById("sign-up-log-in").style.display = "none";
          document.getElementById("sign-up-email").value = "";
          document.getElementById("sign-up-password").value = "";
        }}
      >
        <fieldset>
          <legend>No tenes cuenta ?</legend>
          <div className="email-section">
            <label htmlFor="sign-up-email">Email:</label>
            <input
              type="email"
              id="sign-up-email"
              placeholder="ejemplo@gmail.com"
            ></input>
          </div>
          <div className="password-section">
            <label htmlFor="sign-up-password">Contrasenia:</label>
            <input type="password" id="sign-up-password" />
          </div>
          <div className="button-section">
            <button type="submit">Crear cuenta</button>
            <p>- o -</p>
            <GoogleAuth text={"Entra con Google"} />
          </div>
        </fieldset>
      </form>
    </div>
  );
}
