import { useState } from "react";

import { BotoneraPerfil } from "./BotoneraPerfil";
import { BotoneraPerfilOffline } from "./BotoneraPerfilOffline";
import { UserInfo } from "./UserInfo";
import { UserShopping } from "./UserShopping";
import { LogIn } from "./LogIn.js";
import { SignUp } from "./SignUp.js";

export function Profile(props) {
  const [offlineFilter, setOfflineFilter] = useState("Inicia sesion");
  const [onlineFilter, setOnlineFilter] = useState("Informacion");

  function changeOfflineFilter(e) {
    setOfflineFilter(e.target.innerText);
  }

  function changeOnlineFilter(e) {
    setOnlineFilter(e.target.innerText);
  }

  return (
    <>
      {props.isUserOnline ? (
        <div id="profile-online">
          <BotoneraPerfil changeOnlineFilter={changeOnlineFilter} />

          {onlineFilter === "Informacion" ? (
            <UserInfo userData={props.userData} />
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
