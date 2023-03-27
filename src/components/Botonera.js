import { useState } from "react";

export function Botonera(props) {
  const [activeTab, setActiveTab] = useState("Helados");

  return (
    <div id="botonera">
      <button
        onClick={() => {
          props.setContent(props.catalog.helados);
          window.scrollTo(0, 0);
          setActiveTab("Helados");
        }}
        className={activeTab === "Helados" ? "active" : ""}
      >
        Helados
      </button>

      <button
        onClick={() => {
          props.setContent(props.catalog.escabio);
          setActiveTab("Escabio");
          window.scrollTo(0, 0);
        }}
        className={activeTab === "Escabio" ? "active" : ""}
      >
        Escabio
      </button>
      <button
        onClick={() => {
          props.setContent(props.catalog.helados);
          setActiveTab("Kiosko");
          window.scrollTo(0, 0);
        }}
        className={activeTab === "Kiosko" ? "active" : ""}
      >
        Kiosko
      </button>
    </div>
  );
}
