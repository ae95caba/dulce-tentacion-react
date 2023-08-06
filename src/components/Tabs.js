import React from "react";

import { NavLink } from "react-router-dom";
export default function Tabs() {
  const tabs = ["Catalogo", "Testimonios", "Nosotros", "Galeria"];
  return (
    <>
      {tabs.map((tab) => (
        <NavLink
          to={`/${tab.toLowerCase()}`}
          onClick={(e) => {
            window.scrollTo(0, 0);
          }}
        >
          {tab}
        </NavLink>
      ))}
    </>
  );
}
