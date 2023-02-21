import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
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
          <legend>No tienes cuenta ?</legend>
          <label htmlFor="sign-up-email">Email:</label>
          <input type="email" id="sign-up-email" />
          <label htmlFor="sign-up-password">Contrasenia:</label>
          <input type="password" id="sign-up-password" />
          <button type="submit">Crear cuenta</button>
          <p>O</p>
          <GoogleAuth text={"Crea una cuenta con Google"} />
          <button>
            <Link to="/perfil">Atras</Link>
          </button>
        </fieldset>
      </form>
    </div>
  );
}
