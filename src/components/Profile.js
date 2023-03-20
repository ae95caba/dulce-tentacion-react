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

  return (
    <>
      {props.isUserOnline ? (
        <div id="profile-online">
          <BotoneraPerfil setOnlineFilter={setOnlineFilter} />

          {onlineFilter === "Informacion" ? (
            <UserInfo userData={props.userData} />
          ) : (
            <UserShopping />
          )}
        </div>
      ) : (
        <div id="profile-offline">
          <BotoneraPerfilOffline setOfflineFilter={setOfflineFilter} />

          {offlineFilter === "Inicia sesion" ? (
            <LogIn />
          ) : (
            <SignUp userData={props.userData} />
          )}
        </div>
      )}
    </>
  );
}
