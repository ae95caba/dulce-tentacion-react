import { useEffect, useState } from "react";

export function Cart(props) {
  return (
    <div id="cart">
      <h1>Tu carrito</h1>

      <div className="cart-body">
        {props.cartItems.length > 0 ? (
          props.cartItems.map((item) => {
            return (
              <div className="cart-item">
                <img src={item.imgUrl} alt={item.name} />
                <div className="right">
                  <p>{item.name}</p>
                  <p>{item.totalPrice}</p>

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
          })
        ) : (
          <p id="empty">Tu carrito esta vacio</p>
        )}
      </div>
      <div id="checkout">
        <p>Total ${props.totalPrice()}</p>
        <button
          disabled={props.cartItems.length === 0}
          onClick={() => {
            document.getElementById("cart").style.display = "none";
            document.getElementById("sign-up-log-in").style.display = "grid";
          }}
        >
          Pagar
        </button>
        <button
          onClick={() => {
            document.getElementById("cart").style.display = "none";
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
