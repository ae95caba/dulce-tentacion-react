import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../backend/firebase";
import { Link } from "react-router-dom";
import { GoogleAuth } from "./GoogleAuth";

import { useState } from "react";
import { useEffect } from "react";

export function LogIn() {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  return (
    <form
      id="log-in"
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        const email = document.getElementById("log-in-email").value;
        const password = document.getElementById("log-in-password").value;
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {})
          .catch((error) => {
            console.log(error.message);
            setShowErrorMessage(true);
          });
        document.getElementById("log-in-email").value = "";
        document.getElementById("log-in-password").value = "";
      }}
    >
      <fieldset>
        {showErrorMessage ? (
          <ErrorMessage setShowErrorMessage={setShowErrorMessage} />
        ) : null}
        <legend>Ya tenes cuenta?</legend>
        <div className="email-section">
          <label htmlFor="log-in-email">Email:</label>
          <div className="input-container">
            <img src="/img/email.svg" alt="" />
            <input
              type="email"
              id="log-in-email"
              placeholder="ejemplo@gmail.com"
              required
            />
          </div>
        </div>
        <div className="password-section">
          <label htmlFor="log-in-password">Contrasenia:</label>
          <div className="input-container">
            <img src="img/password.svg" alt="icon" />
            <input type="password" id="log-in-password" required />
          </div>
        </div>
        <div className="buttons-section">
          <button type="submit">Inicia secion</button>
          <p>- o -</p>
          <GoogleAuth text={"Entra con Google"} />
        </div>
      </fieldset>
    </form>
  );
}

function ErrorMessage(props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  });
  return (
    <div className="message-container">
      <div className="message">
        <div className="text">Contraseñia o e-mail incorrecto</div>
        <button
          onClick={() => {
            props.setShowErrorMessage(false);
          }}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
