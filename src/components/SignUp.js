import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../backend/firebase";
import { Link } from "react-router-dom";
import { GoogleAuth } from "./GoogleAuth";
import { useNavigate } from "react-router-dom";
export function SignUp(props) {
  const navigate = useNavigate();
  return (
    <div className="form-container">
      <form
        id="sign-up"
        action=""
        onSubmit={async (e) => {
          e.preventDefault();
          const email = document.getElementById("sign-up-email").value;
          const password = document.getElementById("sign-up-password").value;
          const fullName = document.getElementById("sign-up-name").value;
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          )
            .then((userCredential) => {
              navigate("/perfil");

              alert("sign up");
            })
            .catch((error) => {
              console.log(error.message);
            });
          //document.getElementById("sign-up-log-in").style.display = "none";
          document.getElementById("sign-up-email").value = "";
          document.getElementById("sign-up-password").value = "";
        }}
      >
        <fieldset>
          <legend>No tenes cuenta ?</legend>
          <div className="name-section">
            <label htmlFor="sign-up-name">Nombre completo:</label>
            <div className="input-container">
              <img src="/img/email.svg" alt="icon" />
              <input
                type="name"
                id="sign-up-name"
                placeholder="Nombre y Apellido"
              />
            </div>
          </div>
          <div className="email-section">
            <label htmlFor="sign-up-email">Email:</label>
            <div className="input-container">
              <img src="/img/email.svg" alt="icon" />
              <input
                type="email"
                id="sign-up-email"
                placeholder="ejemplo@gmail.com"
              />
            </div>
          </div>
          <div className="password-section">
            <label htmlFor="sign-up-password">Contrasenia:</label>
            <div className="input-container">
              <img src="/img/password.svg" alt="icon" />
              <input type="password" id="sign-up-password" />
            </div>
          </div>
          <div className="buttons-section">
            <button type="submit">Crear cuenta</button>
            <p>- o -</p>
            <GoogleAuth text={"Entra con Google"} />
          </div>
        </fieldset>
      </form>
    </div>
  );
}
