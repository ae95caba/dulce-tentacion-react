import { useState } from "react";

export function BotoneraPerfil(props) {
  const [activeTab, setActiveTab] = useState("Informacion");

  return (
    <div id="botonera-perfil">
      <button
        onClick={(e) => {
          props.changeFilter(e);
          window.scrollTo(0, 0);
          setActiveTab("Informacion");
        }}
        className={activeTab === "Informacion" ? "active" : ""}
      >
        Informacion
      </button>

      <button
        onClick={(e) => {
          props.changeFilter(e);
          setActiveTab("Compras");
          window.scrollTo(0, 0);
        }}
        className={activeTab === "Compras" ? "active" : ""}
      >
        Compras
      </button>
    </div>
  );
}
