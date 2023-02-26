import { useState } from "react";

export function BotoneraPerfilOffline(props) {
  const [activeTab, setActiveTab] = useState("Iniciar sesion");

  return (
    <div id="botonera-perfil-offline">
      <button
        onClick={(e) => {
          props.changeOfflineFilter(e);
          window.scrollTo(0, 0);
          setActiveTab("Iniciar sesion");
        }}
        className={activeTab === "Iniciar sesion" ? "active" : ""}
      >
        Iniciar sesion
      </button>

      <button
        onClick={(e) => {
          props.changeOfflineFilter(e);
          setActiveTab("Registrarse");
          window.scrollTo(0, 0);
        }}
        className={activeTab === "Registrarse" ? "active" : ""}
      >
        Registrarse
      </button>
    </div>
  );
}
