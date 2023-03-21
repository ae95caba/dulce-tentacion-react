import { useState } from "react";

export function BotoneraPerfilOffline(props) {
  //const [activeTab, setActiveTab] = useState("Inicia sesion");

  return (
    <div id="botonera-perfil-offline">
      <button
        onClick={(e) => {
          props.setOfflineFilter(e.target.innerText);
          window.scrollTo(0, 0);
        }}
        className={props.offlineFilter === "Inicia sesion" ? "active" : ""}
      >
        Inicia sesion
      </button>

      <button
        onClick={(e) => {
          props.setOfflineFilter(e.target.innerText);

          window.scrollTo(0, 0);
        }}
        className={props.offlineFilter === "Registrarse" ? "active" : ""}
      >
        Registrarse
      </button>
    </div>
  );
}
