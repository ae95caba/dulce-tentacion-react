import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebase";
import { Link } from "react-router-dom";
import { GoogleAuth } from "./GoogleAuth";
import { useNavigate } from "react-router-dom";

export function LogIn() {
  const navigate = useNavigate();
  return (
    <div className="form-container">
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
              navigate("/perfil");
            })
            .catch((error) => {
              console.log(error.message);
            });
          document.getElementById("log-in-email").value = "";
          document.getElementById("log-in-password").value = "";
        }}
      >
        <fieldset>
          <legend>Ya tenes cuenta?</legend>
          <div className="email-section">
            <label htmlFor="log-in-email">Email:</label>
            <input
              type="email"
              id="log-in-email"
              placeholder="ejemplo@gmail.com"
            />
          </div>
          <div className="password-section">
            <label htmlFor="log-in-password">Contrasenia:</label>
            <input type="password" id="log-in-password" />
          </div>
          <div className="buttons-section">
            <button type="submit">Inicia secion</button>
            <p>- o -</p>
            <GoogleAuth text={"Entra con Google"} />
          </div>
        </fieldset>
      </form>
    </div>
  );
}
