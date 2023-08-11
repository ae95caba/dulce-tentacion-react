import { NavLink } from "react-router-dom";
export default function CartButton({ totalItems, totalPrice }) {
  return (
    <NavLink
      to="/carrito"
      /*  the following could me unnecesary but better keep it */

      className={totalItems() > 0 ? "" : null}
      id="cart-button"
    >
      <img src="/img/cart.svg" alt="shopping cart" />
      <span id="total-items" className="neon-green">
        {totalItems() > 0 ? totalItems() : null}
      </span>
    </NavLink>
  );
}
