import { useEffect } from "react";
import { useState } from "react";

export function Botonera({ setContent, content, catalog }) {
  return (
    <div id="botonera">
      <button
        onClick={() => {
          setContent(catalog?.helados);
          window.scrollTo(0, 0);
        }}
        className={content === catalog?.helados && content ? "active" : ""}
      >
        Helados
      </button>

      <button
        onClick={() => {
          setContent(catalog?.escabio);

          window.scrollTo(0, 0);
        }}
        className={content === catalog?.escabio && content ? "active" : ""}
      >
        Escabio
      </button>
      <button
        onClick={() => {
          setContent(catalog.helados);

          window.scrollTo(0, 0);
        }}
        className={content === catalog?.kiosko && content ? "active" : ""}
      >
        Kiosko
      </button>
    </div>
  );
}
