import { useState } from "react";

export function BotoneraPerfil(props) {
  const [activeTab, setActiveTab] = useState("Informacion");
  console.log(activeTab);
  return (
    <div id="botonera-perfil">
      <button
        onClick={(e) => {
          props.setOnlineFilter(e.target.innerText);
          window.scrollTo(0, 0);
          setActiveTab("Informacion");
        }}
        className={activeTab === "Informacion" ? "active" : ""}
      >
        Informacion
      </button>

      <button
        id="compras"
        onClick={(e) => {
          props.setOnlineFilter(e.target.innerText);
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
