import { useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { addCartToFirestore } from "../backend/addCartToFiresstore";
import uniqid from "uniqid";
import { options } from "../logic/barrios";
import Select from "react-select";
import { link } from "../logic/whatsappLink";
import { addLastDeliveryDetails } from "../backend/addLastDeliveryDetails";
import { getLastDeliveryDetails } from "../backend/getLastDeliveryDetails";
import { priceFromBarrio } from "../logic/barrios";

export function Cart(props) {
  const navigate = useNavigate();
  //the following wil be and object  {value: , label}
  const [barrioElegido, setBarrioElegido] = useState(null); // Set default option

  const [orderFulfillment, setOrderFulfillment] = useState({
    delivery: false,
    pickup: false,
  });

  useEffect(() => {
    //jorderFulfillment doesnt change when changing grom one Select option to another
    if (orderFulfillment.delivery === false) {
      props.setDeliveryPrice(0);
    }
  }, [orderFulfillment]);

  useEffect(() => {
    if (barrioElegido && orderFulfillment.delivery) {
      props.setDeliveryPrice(priceFromBarrio(barrioElegido.label));
    }
  }, [barrioElegido, orderFulfillment]);

  function handleSubmit(e) {
    e.preventDefault();

    document.getElementById("cart").style.display = "none";

    if (props.isUserOnline) {
      if (orderFulfillment.delivery) {
        //create deliveryDetails

        const deliveryDetails = {
          barrio: document.getElementById("barrio").value,
          direccion: document.getElementById("direccion").value,
          entreCalles: document.getElementById("entre-calles").value,
          aditionalInfo: document.getElementById("aditional-info").value,
        };

        addLastDeliveryDetails(deliveryDetails);

        addCartToFirestore(
          props.cartItems,
          props.totalPrice(),
          orderFulfillment,
          (props.totalPrice() / 100) * 5,
          uniqid(),
          deliveryDetails
        );

        window.open(
          link(props.cartItems, deliveryDetails, props.userData),
          "_blank"
        );
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
      setOrderFulfillment({
        delivery: false,
        pickup: false,
      });

      props.clearCart();
    } else {
      navigate("/perfil");
      document.body.style.overflow = "auto";
    }
  }

  //
  const containerRef = useRef(null);
  function handleClick(e) {
    if (e.target === containerRef.current.querySelector("button[disabled]")) {
      // Run your code here
      console.log("Clicked on disabled button");
    }
  }

  return (
    <div id="cart">
      <h1>Tu carrito</h1>
      <div className="cart-body">
        {props.cartItems.length > 0 ? (
          props.cartItems.map((item) => {
            const detailsId = uniqid();
            if (item.name === "delivery") {
              return null;
            }
            return (
              <div className="cart-item" key={uniqid()}>
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
          setBarrioElegido={setBarrioElegido}
          barrioElegido={barrioElegido}
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

          <button type="submit" form="delivery-form">
            Comprar
          </button>
        </div>
      ) : null}
      <img
        src="/img/return.svg"
        alt="return"
        className="close"
        onClick={() => {
          document.body.style.overflow = "auto";
          document.getElementById("cart").style.display = "none";
        }}
      />
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
              <div key={uniqid()}>
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
  const [deliveryDetails, setDeliveryDetails] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        //this can be one of 3
        //if user online and has bought : details obj
        //if user offline : {}
        //if user online and hasnt bought : {}
        const details = await getLastDeliveryDetails();
        setDeliveryDetails({ ...details });
        if (details.barrio) {
          const barrioObj = {
            value: details.barrio.toLowerCase(),
            label: details.barrio,
          };

          props.setBarrioElegido(barrioObj);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
  }, []);

  /*  useEffect(() => {
    const product = { name: "delivery", count: 1, price: 100 };
    props.setDeliveryPrice();
  }, [barrioElegido]); */

  function autoResize(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + 5 + "px";
  }

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
              onChange={(selected) => {
                props.setBarrioElegido(selected);
              }}
              options={options}
              placeholder="Barrio *"
              name="Barrio"
              value={props.barrioElegido}
              required
            />
          </div>
          <input
            id="barrio"
            value={props.barrioElegido ? props.barrioElegido.label : ""}
            style={{ display: "none" }}
          />
          <div className="input-container">
            <input
              type="text"
              placeholder="Direccion *"
              autoComplete="street-address"
              required
              id="direccion"
              defaultValue={deliveryDetails.direccion}
              onChange={(event) => {
                console.log(document.getElementById("barrio").value);
                setDeliveryDetails({
                  ...deliveryDetails,
                  direccion: event.target.value,
                });
              }}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Entre calles *"
              required
              id="entre-calles"
              defaultValue={deliveryDetails.entreCalles}
              onChange={(event) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  entreCalles: event.target.value,
                })
              }
            />
          </div>
          <div className="input-container">
            <textarea
              id="aditional-info"
              onInput={(e) => autoResize(e.target)}
              placeholder="Opcional:
														Descripcion de la casa, ejemplo: frente rojo, puerta negra de chapa."
              defaultValue={deliveryDetails.aditionalInfo}
              onChange={(event) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  aditionalInfo: event.target.value,
                })
              }
            ></textarea>
          </div>
        </fieldset>
      ) : null}
    </form>
  );
}
