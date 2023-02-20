import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../backend/firebase";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

export function Profile() {
  const [isUserOnline, setIsUserOnline] = useState();
  const [userImg, setUserImg] = useState(
    "https://picsum.photos/id/684/400/400"
  );
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();

  useEffect(() => {
    console.log("use effect");
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("hay un usuario logeado");
        console.log(user);
        //alert(Object.getOwnPropertyNames(user));
        console.log(user.photoURL);
        setIsUserOnline(true);
        if (user.displayName) {
          setUserName(user.displayName);
        }
        if (user.email) {
          setUserEmail(user.email);
        }
        if (user.photoURL) {
          setUserImg(user.photoURL);
        }
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
          <div id="user-online">
            <div id="user-info">
              <img src={userImg} alt="" />
              <p>Bienvenido {!userName ? userEmail : userName}</p>
              <p>Puntos: 1000</p>
            </div>
            <div id="shopping">
              <h2>Mis compras</h2>
              <div className="list">No tienes compras</div>
            </div>
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
        <div id="user-offline">
          <Link to="/perfil/iniciar-sesion">
            <button>Iniciar session</button>
          </Link>
          <p>O</p>
          <Link to="/perfil/crear-cuenta">
            <button>Crea una cuenta</button>
          </Link>
        </div>
      )}
    </div>
  );
}
