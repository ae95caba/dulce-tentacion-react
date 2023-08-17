import { NavLink } from "react-router-dom";

const tabsObj = ["Catalogo", "Nosotros", "Galeria"];
export function Header({ getTotalCartItems }) {
  return (
    <header>
      <NavLink to="/">
        <img id="logo" alt="company logo" src="/img/logo-white.png" />
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
        <NavLink to={`/${tab.toLowerCase()}`}>{tab}</NavLink>
      ))}
    </>
  );
}
