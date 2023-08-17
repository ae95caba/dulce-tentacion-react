import { NavLink, useLocation } from "react-router-dom";

const tabsObj = ["Catalogo", "Nosotros", "Galeria"];
export function Header({ getTotalCartItems }) {
  const location = useLocation();
  const isProfileActive = location.pathname === "/perfil";
  const isHomeActive = location.pathname === "/";

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

        <label className="hamburger-menu">
          <input type="checkbox" />
        </label>
        <Sidebar />
        <CartButton getTotalCartItems={getTotalCartItems} />
      </div>
    </header>
  );
}

function CartButton({ getTotalCartItems }) {
  return (
    <NavLink
      to="/carrito"
      /*  the following could me unnecesary but better keep it */

      className={getTotalCartItems() > 0 ? "" : null}
      id="cart-button"
    >
      <img src="/img/cart.svg" alt="shopping cart" />
      <span id="total-items" className="neon-green">
        {getTotalCartItems() > 0 ? getTotalCartItems() : null}
      </span>
    </NavLink>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <Tabs />
    </aside>
  );
}

function Tabs() {
  return (
    <>
      {tabsObj.map((tab) => (
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
