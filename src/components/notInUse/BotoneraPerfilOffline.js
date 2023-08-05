import { useState } from "react";

export function BotoneraPerfilOffline(props) {
  return (
    <div id="botonera-perfil-offline">
      <button
        onClick={(e) => {
          props.setOfflineFilter("login");
          window.scrollTo(0, 0);
        }}
        className={props.offlineFilter === "login" ? "active" : ""}
      >
        Entrar
      </button>

      <button
        onClick={(e) => {
          props.setOfflineFilter("signup");

          window.scrollTo(0, 0);
        }}
        className={props.offlineFilter === "signup" ? "active" : ""}
      >
        Registrarse
      </button>
    </div>
  );
}
