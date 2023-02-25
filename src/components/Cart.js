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
                  <p>{item.name}</p>
                  <p>${item.totalPrice}</p>

                  <div className="quantity">
                    <button
                      onClick={() => {
                        props.removeCartItem(item);
                      }}
                    >
                      -
                    </button>
                    unidades: {item.count}
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
          <p id="empty">Todabia no agregaste nada a tu carrito, que esperas?</p>
        )}
      </div>
      {props.cartItems.length > 0 ? (
        <div className="total-points">
          Con esta compra obtienes <span>{(props.totalPrice() / 100) * 5}</span>{" "}
          puntos !
        </div>
      ) : null}
      <div id="checkout">
        <p>Total: </p>
        <p>${props.totalPrice()}</p>
        <p>o</p>
        <p>{props.totalPrice()} puntos</p>
        <div className="buttons-container">
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
          <button
            onClick={() => {
              document.getElementById("cart").style.display = "none";
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
