import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../backend/firebase";
import { BotoneraPerfil } from "./BotoneraPerfil";
import { BotoneraPerfilOffline } from "./BotoneraPerfilOffline";
import { UserInfo } from "./UserInfo";
import { UserShopping } from "./UserShopping";
import { LogIn } from "./LogIn.js";
import { SignUp } from "./SignUp.js";

export function Profile() {
  const [isUserOnline, setIsUserOnline] = useState();

  const [userData, setUserData] = useState({
    name: undefined,
    email: undefined,
    img: "https://picsum.photos/id/684/400/400",
  });

  const [offlineFilter, setOfflineFilter] = useState("Inicia sesion");
  const [onlineFilter, setOnlineFilter] = useState("Informacion");

  //set isUserOnline and userData
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUserOnline(true);

        setUserData({
          name: user.displayName,
          email: user.email,
          img: user.photoURL,
        });
      } else {
        setIsUserOnline(false);
      }
    });
  }, []);

  function changeOfflineFilter(e) {
    setOfflineFilter(e.target.innerText);
  }

  function changeOnlineFilter(e) {
    setOnlineFilter(e.target.innerText);
  }

  return (
    <>
      {isUserOnline ? (
        <div id="profile-online">
          <BotoneraPerfil changeOnlineFilter={changeOnlineFilter} />

          {onlineFilter === "Informacion" ? (
            <UserInfo userData={userData} />
          ) : (
            <UserShopping />
          )}
        </div>
      ) : (
        <div id="profile-offline">
          <BotoneraPerfilOffline changeOfflineFilter={changeOfflineFilter} />

          {offlineFilter === "Iniciar sesion" ? <LogIn /> : <SignUp />}
        </div>
      )}
    </>
  );
}
