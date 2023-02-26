import { useEffect, useState } from "react";
import { auth } from "../backend/firebase";
import { useNavigate } from "react-router-dom";
import { addCartToFirestore } from "../backend/addCartToFiresstore";

export function Cart(props) {
  const navigate = useNavigate();
  const [isUserOnline, setIsUserOnline] = useState();
  const [isCartEmpty, setIsCartEmpty] = useState();

  useEffect(() => {
    if (props.cartItems.length === 0) {
      setIsCartEmpty(true);
    }
  }, [props.cartItems]);

  useEffect(() => {
    console.log("use effect");
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUserOnline(true);
      } else {
        setIsUserOnline(false);
      }
    });
  }, []);

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
                  <div className="description">
                    <p className="description-name">{item.name}</p>
                    <p className="description-price">$ {item.totalPrice}</p>
                  </div>

                  <div className="quantity">
                    <button
                      onClick={() => {
                        props.removeCartItem(item);
                      }}
                    >
                      -
                    </button>
                    <p>unidades: {item.count}</p>
                    <button
                      onClick={() => {
                        props.addCartItem(item);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p id="empty">No hay nada aca, porque no agregas algo?</p>
        )}
      </div>
      {props.cartItems.length > 0 ? (
        <div className="total-points">
          Con esta compra te damos{" "}
          <span className="number">{(props.totalPrice() / 100) * 5}</span>{" "}
          puntos !
        </div>
      ) : null}
      {props.cartItems.length > 0 ? (
        <div id="checkout">
          <p id="checkout-tittle">Total a pagar: </p>
          <div id="summary-container">
            <div id="summary">
              <p>${props.totalPrice()}</p>
              <p> o</p>
              <p>{props.totalPrice()} puntos</p>
            </div>
          </div>

          <button
            disabled={props.cartItems.length === 0}
            onClick={() => {
              document.getElementById("cart").style.display = "none";
              if (isUserOnline) {
                props.showThanksMessage();
                /////add firebase firestore
                addCartToFirestore(
                  props.cartItems,
                  props.totalPrice(),
                  (props.totalPrice() / 100) * 5
                );
                //clear cart
                props.clearCart();
              } else {
                navigate("/perfil");
              }
            }}
          >
            Pagar
          </button>
        </div>
      ) : null}

      <button
        className="close"
        onClick={() => {
          document.getElementById("cart").style.display = "none";
        }}
      >
        Cerrar
      </button>
    </div>
  );
}
