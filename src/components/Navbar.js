import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CartButton from "./CartButton";

export function Navbar(props) {
  const [showSidebar, setShowSidebar] = useState(false);

  const location = useLocation();
  const isProfileActive = location.pathname === "/perfil";
  const isHomeActive = location.pathname === "/";
  return (
    <>
      <nav>
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
          <ul>
            <li>
              <NavLink
                to="/catalogo"
                onClick={(e) => {
                  window.scrollTo(0, 0);
                }}
              >
                Catalogo
              </NavLink>
            </li>

            <li>
              <NavLink>Testimonios</NavLink>
            </li>
            <li>
              <NavLink>Nosotros</NavLink>
            </li>
          </ul>
          <div className="sub-container">
            <button
              onClick={() => {
                setShowSidebar((prev) => !prev);
              }}
              className="burger-menu"
            >
              <div></div>
              <div></div>
              <div></div>
            </button>
            <CartButton
              cartDisplayProperty={props.cartDisplayProperty}
              totalItems={props.totalItems}
              totalPrice={props.totalPrice}
            />
          </div>
        </div>
        {showSidebar && <Sidebar />}
      </nav>
    </>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>Contact us</li>
        <li>Nosotros</li>
        <li>Ubicacion</li>
        <li>Horarios</li>
      </ul>
    </div>
  );
}
