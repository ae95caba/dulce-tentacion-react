import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import classNames from "classnames";

export function Navbar(props) {
  const location = useLocation();
  const isProfileActive = location.pathname === "/perfil";
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
            onClick={(e) => {
              window.scrollTo(0, 0);
            }}
            className={`${
              props.isUserOnline && !isProfileActive ? "inactive" : ""
            } ${isProfileActive ? "active" : ""}`}
          >
            Perfil
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
