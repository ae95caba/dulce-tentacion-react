import { useEffect, useState } from "react";
import { auth } from "../backend/firebase";
import { useNavigate } from "react-router-dom";

export function Cart(props) {
  console.log(props.showThanksMessage); // check if props.showThanksMessage is defined
  const navigate = useNavigate();
  const [isUserOnline, setIsUserOnline] = useState();

  useEffect(() => {
    console.log("use effect");
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("hay un usuario logeado");
        console.log(user);
        //alert(Object.getOwnPropertyNames(user));

        setIsUserOnline(true);
      } else {
        console.log("no hay un usuario activo");
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
            if (isUserOnline) {
              props.showThanksMessage();
              /////add firebase firestore
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
  );
}
