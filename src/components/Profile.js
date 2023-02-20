import { useState, useEffect } from "react";
import { auth } from "../backend/firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

export function Profile() {
  const [isUserOnline, setIsUserOnline] = useState();

  useEffect(() => {
    console.log("use effect");
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("hay un usuario logeado");
        console.log(user);
        setIsUserOnline(true);
      } else {
        console.log("no hay un usuario activo");
        setIsUserOnline(false);
      }
    });
  }, []);

  return (
    <div id="profile">
      {isUserOnline ? (
        <>
          <div>
            <img src="https://picsum.photos/id/684/400/400" alt="" />
            <p>Andre</p>
            <p>Puntos: 1000</p>
            <button
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    console.log("saliste perri");
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
              }}
            >
              Cerrar session
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="header">Inicia session para ver tu perfil</div>
          <button
            onClick={() => {
              document.getElementById("sign-up-log-in").style.display = "grid";
            }}
          >
            Iniciar session
          </button>
        </>
      )}
    </div>
  );
}
