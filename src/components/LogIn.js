import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
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
          <legend>Ya tienes cuenta?</legend>
          <label htmlFor="log-in-email">Email:</label>
          <input type="email" id="log-in-email" />
          <label htmlFor="log-in-password">Contrasenia:</label>
          <input type="password" id="log-in-password" />
          <button type="submit">Iniciar secion</button>
          <p>O</p>
          <GoogleAuth text={"Inicia sesion con Google"} />
          <button>
            <Link to="/perfil">Atras</Link>
          </button>
        </fieldset>
      </form>
    </div>
  );
}
