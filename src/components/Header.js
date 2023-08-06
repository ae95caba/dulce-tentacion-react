import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import CartButton from "./CartButton";
import Sidebar from "./Sidebar";
import Tabs from "./Tabs";

export function Header(props) {
  const location = useLocation();
  const isProfileActive = location.pathname === "/perfil";
  const isHomeActive = location.pathname === "/";
  const tabs = ["Catalogo", "Testimonios", "Nosotros"];
  return (
    <header>
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
      <div className="container">
        <nav>
          <Tabs />
        </nav>

        <label class="hamburger-menu">
          <input type="checkbox" />
        </label>
        <Sidebar tabs={tabs} />
        <CartButton
          cartDisplayProperty={props.cartDisplayProperty}
          totalItems={props.totalItems}
          totalPrice={props.totalPrice}
        />
      </div>
    </header>
  );
}
