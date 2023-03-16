import { useEffect, useState } from "react";
import { auth } from "../backend/firebase";
import { useNavigate } from "react-router-dom";
import { addCartToFirestore } from "../backend/addCartToFiresstore";
import uniqid from "uniqid";
import { barriosMP, options } from "../logic/barrios";
import Select from "react-select";
import { link } from "../logic/whatsappLink";

export function Cart(props) {
  const navigate = useNavigate();
  const [isUserOnline, setIsUserOnline] = useState();
  const [orderFulfillment, setOrderFulfillment] = useState({
    delivery: false,
    pickup: false,
  });

  function handleSubmit(e) {
    e.preventDefault();

    document.getElementById("cart").style.display = "none";

    if (isUserOnline) {
      if (orderFulfillment.delivery) {
        //create deliveryDetails

        const deliveryDetails = {
          barrio: document.getElementById("barrio").value,
          direccion: document.getElementById("direccion").value,
          entreCalles: document.getElementById("entre-calles").value,
          aditionalInfo: document.getElementById("aditional-info").value,
        };

        addCartToFirestore(
          props.cartItems,
          props.totalPrice(),
          orderFulfillment,
          (props.totalPrice() / 100) * 5,
          uniqid(),
          deliveryDetails
        );

        window.open(link(props.cartItems, deliveryDetails), "_blank");
      } else if (orderFulfillment.pickup) {
        props.showThanksMessage();
        addCartToFirestore(
          props.cartItems,
          props.totalPrice(),
          orderFulfillment,
          (props.totalPrice() / 100) * 5,
          uniqid()
        );
      }
      //for all online conditions

      props.clearCart();
    } else {
      navigate("/perfil");
    }
  }

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
          Ganas <span className="number">{(props.totalPrice() / 100) * 5}</span>{" "}
          puntos !
        </div>
      ) : null}
      {props.cartItems.length > 0 ? (
        <DeliveryForm
          handleSubmit={handleSubmit}
          setOrderFulfillment={setOrderFulfillment}
          orderFulfillment={orderFulfillment}
        />
      ) : null}
      {props.cartItems.length > 0 ? (
        <div id="checkout">
          <p id="checkout-tittle">Total: </p>
          <div id="summary-container">
            <div id="summary">
              <p>
                $ {props.totalPrice()} / {props.totalPrice()} puntos{" "}
              </p>
            </div>
          </div>

          <button
            type="submit"
            form="delivery-form"
            disabled={props.cartItems.length === 0}
          >
            Comprar
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

function DeliveryForm(props) {
  function autoResize(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + 5 + "px";
  }

  const handleChange = (selectedOption) => {
    document.getElementById("barrio").value = selectedOption.label;
  };

  return (
    <form
      id="delivery-form"
      autoComplete="on"
      onSubmit={(e) => props.handleSubmit(e)}
    >
      <div className="options">
        <div className="option">
          <label
            onClick={() => {
              if (!props.orderFulfillment.pickup) {
                props.setOrderFulfillment({
                  delivery: false,
                  pickup: true,
                });
              }
            }}
          >
            <span>Retiro en el local</span>
            <input
              type="radio"
              name="pickup-delivery"
              value="pickup"
              id="option-1"
              checked={props.orderFulfillment.pickup}
              required
            />
          </label>
        </div>
        <div className="option">
          <label
            onClick={() => {
              if (!props.orderFulfillment.delivery) {
                props.setOrderFulfillment({
                  delivery: true,
                  pickup: false,
                });
              }
            }}
          >
            <span>Envio a domicilio</span>
            <input
              type="radio"
              name="pickup-delivery"
              value="delivery"
              id="option-2"
              checked={props.orderFulfillment.delivery}
              required
            />
          </label>
        </div>
      </div>

      {props.orderFulfillment.delivery ? (
        <fieldset id="delivery-info">
          <div className="input-container">
            <Select
              onChange={handleChange}
              options={options}
              placeholder="Barrio"
              name="Barrio"
              required
            />
          </div>
          <input id="barrio" style={{ display: "none" }} />
          <div className="input-container">
            <input
              type="text"
              placeholder="Direccion"
              autoComplete="street-address"
              required
              id="direccion"
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Entre calles"
              required
              id="entre-calles"
            />
          </div>
          <div className="input-container">
            <textarea
              id="aditional-info"
              onInput={(e) => autoResize(e.target)}
              placeholder="Informacion adicional, ejemplo: frente rojo, puerta negra de chapa."
            ></textarea>
          </div>
        </fieldset>
      ) : null}
    </form>
  );
}
