import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export function Navbar(props) {
  const location = useLocation();
  const isProfileActive = location.pathname === "/perfil";
  const isHomeActive = location.pathname === "/";
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
            <img
              id="logo"
              alt="company logo"
              src={isHomeActive ? "/img/logo-red.png" : "/img/logo-white.png"}
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tienda"
            onClick={(e) => {
              window.scrollTo(0, 0);
            }}
          >
            Catalogo
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
              props.isUserOnline && !isProfileActive ? "neon-green" : ""
            } ${isProfileActive ? "active" : ""}`}
          >
            Perfil
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
