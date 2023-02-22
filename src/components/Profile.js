import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../backend/firebase";
import { BotoneraPerfil } from "./BotoneraPerfil";
import { UserInfo } from "./UserInfo";
import { UserShopping } from "./UserShopping";

export function Profile() {
  const [isUserOnline, setIsUserOnline] = useState();

  const [userData, setUserData] = useState({
    name: undefined,
    email: undefined,
    img: "https://picsum.photos/id/684/400/400",
  });

  const [currentFilter, setCurrentFilter] = useState("Informacion");

  //set isUserOnline and userData
  useEffect(() => {
    console.log("use effect");
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("hay un usuario logeado");
        console.log(user);

        setIsUserOnline(true);

        setUserData({
          name: user.displayName,
          email: user.email,
          img: user.photoURL,
        });
      } else {
        console.log("no hay un usuario activo");
        setIsUserOnline(false);
      }
    });
  }, []);

  function changeFilter(e) {
    setCurrentFilter(e.target.innerText);
  }

  return (
    <div id="profile">
      {isUserOnline ? (
        <>
          <BotoneraPerfil changeFilter={changeFilter} />

          {currentFilter === "Informacion" ? (
            <UserInfo userData={userData} />
          ) : (
            <UserShopping />
          )}
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
