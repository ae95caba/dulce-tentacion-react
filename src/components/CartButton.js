export default function CartButton({
  cartDisplayProperty,
  totalItems,
  totalPrice,
}) {
  return (
    <a
      /*  the following could me unnecesary but better keep it */
      href={cartDisplayProperty === "flex" ? "javascript:void(0)" : "#cart"}
      className={totalItems() > 0 ? "" : null}
      id="cart-button"
    >
      <img src="/img/cart.svg" alt="shopping cart" />
      <span id="total-items" className="neon-green">
        {totalItems() > 0 ? totalItems() : null}
      </span>
    </a>
  );
}
