import { useEffect, useState } from "react";

export function Cart(props) {
  return (
    <div id="cart">
      <h1>Tu carrito</h1>

      <div className="cart-body">
        {props.cartItems.map((item) => {
          return (
            <div className="cart-item">
              <img src={item.imgUrl} alt={item.name} />
              <div className="right">
                <div>{item.name}</div>
                <div>{item.totalPrice}</div>

                <div className="quantity">
                  <button
                    onClick={() => {
                      props.addCartItem(item);
                    }}
                  >
                    +
                  </button>{" "}
                  unidades{item.count}{" "}
                  <button
                    onClick={() => {
                      props.removeCartItem(item);
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <p>Total ${props.totalPrice()}</p>
        <button>Pagar</button>
        <button>Cerrar</button>
      </div>
    </div>
  );
}
