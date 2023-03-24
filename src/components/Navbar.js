import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import classNames from "classnames";

export function Navbar(props) {
  const [activeTab, setActiveTab] = useState("Inicio");

  return (
    <nav>
      <ul>
        <li>
          <Link
            to="/"
            onClick={(e) => {
              setActiveTab("Inicio");
              window.scrollTo(0, 0);
            }}
            className={activeTab === "Inicio" ? "active" : ""}
          >
            Inicio
          </Link>
        </li>
        <li>
          <Link
            to="/tienda"
            onClick={(e) => {
              setActiveTab("Tienda");
              window.scrollTo(0, 0);
            }}
            className={activeTab === "Tienda" ? "active" : ""}
          >
            Tienda
          </Link>
        </li>
        <li>
          <Link
            to="/perfil"
            onClick={(e) => {
              setActiveTab("Profile");
              window.scrollTo(0, 0);
            }}
            /* className={activeTab === "Profile" ? "active" : ""} */
            className={`container 
    ${activeTab === "Profile" ? "active" : ""}
    ${activeTab !== "Profile" && props.isUserOnline ? "inactive" : ""}
    
`}
          >
            Perfil
          </Link>
        </li>
      </ul>
    </nav>
  );
}
