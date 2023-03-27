import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import classNames from "classnames";

export function Navbar(props) {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            onClick={(e) => {
              window.scrollTo(0, 0);
            }}
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tienda"
            onClick={(e) => {
              window.scrollTo(0, 0);
            }}
          >
            Tienda
          </NavLink>
        </li>
        <li>
          <NavLink
            id="profile-button"
            to="/perfil"
            activeClassName="Profile"
            onClick={(e) => {
              window.scrollTo(0, 0);
            }}
            /* className={activeTab === "Profile" ? "active" : ""} */
          >
            Perfil
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
