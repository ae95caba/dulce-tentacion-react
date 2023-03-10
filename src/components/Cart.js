import { useEffect, useState } from "react";
import { auth } from "../backend/firebase";
import { useNavigate } from "react-router-dom";
import { addCartToFirestore } from "../backend/addCartToFiresstore";
import uniqid from "uniqid";

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
            const detailsId = uniqid();
            return (
              <div className="cart-item">
                <img src={item.imgUrl} alt={item.name} />
                <div className="right">
                  <div className="remove" onClick={() => props.removeAll(item)}>
                    x
                  </div>
                  <div className="description">
                    <p className="description-name">{item.name}</p>
                    <p className="description-price">$ {item.totalPrice}</p>
                  </div>
                  {item.flavoursArr ? (
                    <div
                      className="details-button"
                      onClick={() => {
                        console.log(item.flavoursArr);
                        const details = document.getElementById(detailsId);

                        details.style.display === "flex"
                          ? (details.style.display = "none")
                          : (details.style.display = "flex");
                      }}
                    >
                      Detalle
                    </div>
                  ) : (
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
                  )}
                </div>
                {item.flavoursArr ? (
                  <Details item={item} detailsId={detailsId} />
                ) : null}
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
              <p>$ {props.totalPrice()}</p>
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
                  (props.totalPrice() / 100) * 5,
                  uniqid()
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

export function Details(props) {
  return (
    <div className="details" id={props.detailsId}>
      <div className="flavours">
        <div className="tittle">Sabores</div>
        <div className="flavours-body">
          {props.item.flavoursArr.map((flavour) => {
            console.log(flavour.required);
            return (
              <div>
                - {flavour.required}
                {flavour.optional ? `, sino ${flavour.optional}` : null}
              </div>
            );
          })}
        </div>
      </div>
      {props.item.extras.rocklets.isChecked ||
      props.item.extras.salsa.type ||
      props.item.extras.conos.count ? (
        <div className="extras">
          <div className="tittle">Extras</div>
          <div className="extras-body">
            {props.item.extras.rocklets.isChecked ? <div>Rocklets</div> : null}
            {props.item.extras.salsa.type ? (
              <div>Salsa de {props.item.extras.salsa.type}</div>
            ) : null}
            {props.item.extras.conos.count ? (
              <div> {props.item.extras.conos.count} conos</div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
