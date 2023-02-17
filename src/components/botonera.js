import { useState, useEffect } from "react";

export function Botonera(props) {
  const [activeTab, setActiveTab] = useState("Helados");

  return (
    <div id="botonera">
      <button
        onClick={(e) => {
          props.changeContent(e);
          window.scrollTo(0, 0);
          setActiveTab("Helados");
        }}
        className={activeTab === "Helados" ? "active" : ""}
      >
        Helados
      </button>

      <button
        onClick={(e) => {
          props.changeContent(e);
          setActiveTab("Escabio");
          window.scrollTo(0, 0);
        }}
        className={activeTab === "Escabio" ? "active" : ""}
      >
        Escabio
      </button>
      <button
        onClick={(e) => {
          props.changeContent(e);
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
