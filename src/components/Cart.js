import { useEffect, useState, useRef } from "react";
import { useHash } from "react-use";
import { useLocation } from "react-router-dom";
import { addCartToFirestore } from "../backend/addCartToFiresstore";
import uniqid from "uniqid";
import { options } from "../logic/barrios";
import Select from "react-select";
import { link } from "../logic/whatsappLink";

import { priceFromBarrio } from "../logic/barrios";

import { useNavigate } from "react-router-dom";

export function Cart(props) {
  const navigate = useNavigate();

  //the following wil be and object  {value: , label}

  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [orderFulfillment, setOrderFulfillment] = useState({
    delivery: false,
    pickup: false,
  });
  const location = useLocation();

  const currentHash = location.hash;
  const [hash, setHash] = useHash(null);

  //get deliveryDetails from localStorage if there is any
  //and populate form with it
  useEffect(() => {
    let detailsString = localStorage.getItem("deliveryDetails");
    /*  alert("mount"); */

    if (detailsString) {
      const details = JSON.parse(detailsString);

      setDeliveryDetails({ ...details });
    }
  }, []);

  //add deliveryDetails to localStorage on every state update
  useEffect(() => {
    if (deliveryDetails) {
      //save  deliveryDetails to local storage
      const deliveryDetailsString = JSON.stringify(deliveryDetails);
      localStorage.setItem("deliveryDetails", deliveryDetailsString);
    }
    ///////////////////////////
  }, [deliveryDetails]);

  useEffect(() => {
    if (currentHash !== "#cart" && props.cartDisplayProperty === "flex") {
      animateAndClose();
    } else if (currentHash === "#cart") {
      props.setCartDisplayProperty("flex");
    }
  }, [currentHash]);

  useEffect(() => {
    //orderFulfillment doesnt change when changing from one Select option to another
    if (orderFulfillment.delivery === false) {
      props.setDeliveryPrice(0);
    }
  }, [orderFulfillment]);

  useEffect(() => {
    if (deliveryDetails?.barrio && orderFulfillment.delivery) {
      props.setDeliveryPrice(priceFromBarrio(deliveryDetails.barrio));
    }
  }, [deliveryDetails, orderFulfillment]);

  function handleSubmit(e) {
    e.preventDefault();

    setHash("");

    if (orderFulfillment.delivery) {
      if (props.isUserOnline) {
        addCartToFirestore(
          props.cartItems,
          props.totalPrice(),
          orderFulfillment,
          (props.totalPrice() / 100) * 5,
          uniqid(),
          deliveryDetails
        );
      }

      window.open(
        link(
          props.cartItems,
          deliveryDetails,
          props.userData,
          props.totalPrice()
        ),
        "_blank"
      );

      //open purchase list
      if (props.isUserOnline) {
        navigate("/perfil");
        setTimeout(() => {
          document.getElementById("compras").click();
        }, 100);
      }
    } else if (orderFulfillment.pickup) {
      /*  props.showThanksMessage(); */
      if (props.isUserOnline) {
        addCartToFirestore(
          props.cartItems,
          props.totalPrice(),
          orderFulfillment,
          (props.totalPrice() / 100) * 5,
          uniqid()
        );
      }
      window.open(
        link(props.cartItems, undefined, props.userData, props.totalPrice()),
        "_blank"
      );
    }
    //for all online conditions
    //reseter
    setOrderFulfillment({
      delivery: false,
      pickup: false,
    });

    props.clearCart();
  }
  //animateAndClose: remove fadein class , add fadeout class, set onAnimationend :remove fadeout, Close

  const ref = useRef(null);

  function animateAndClose() {
    ref.current.classList.remove("animate__animated", "animate__fadeInLeft");
    ref.current.classList.add("animate__animated", "animate__fadeOutLeft");
    function handleAnimationEnd() {
      props.setCartDisplayProperty("none");
    }
    ref.current.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  }

  ///////////////////////////
  return (
    <div
      ref={ref}
      id="cart"
      className={
        props.cartDisplayProperty === "flex"
          ? "animate__animated animate__fadeInLeft"
          : ""
      }
      style={{ display: props.cartDisplayProperty }}
    >
      <div className="cart-content">
        <h1>Tu carrito</h1>
        <div className="cart-body">
          {props.cartItems.length > 0 ? (
            props.cartItems.map((item, index) => {
              const detailsId = uniqid();
              return (
                //fixed bug, do not use uniqid on the key or the images will refresh every time the delivery option changes
                <div className="cart-item" key={`${item.name}-${index}`}>
                  <div className="left">
                    <img
                      className="thumbnail"
                      src={item.imgUrl}
                      alt={item.name}
                    />
                    <img
                      className="remove"
                      alt="remove"
                      src="/img/recycle-bin.svg"
                      onClick={() => props.removeAll(item)}
                    />
                  </div>
                  <div className="right">
                    <div className="description">
                      <p className="description-name">{item.name}</p>
                      <p className="description-price">$ {item.totalPrice}</p>
                    </div>
                    <div style={{ position: "relative" }}>
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
                        ""
                      )}
                    </div>
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
          <DeliveryForm
            isUserOnline={props.isUserOnline}
            ///

            ////
            handleSubmit={handleSubmit}
            setOrderFulfillment={setOrderFulfillment}
            orderFulfillment={orderFulfillment}
            deliveryDetails={deliveryDetails}
            setDeliveryDetails={setDeliveryDetails}
          />
        ) : null}
        {props.cartItems.length > 0 ? (
          <div id="checkout">
            <p id="checkout-tittle">Total: </p>
            <div id="summary-container">
              <div id="summary">
                <p>$ {props.totalPrice()}</p>
              </div>
            </div>
            <div className="buttons-container">
              <button
                type="submit"
                className={
                  props.isUserOnline
                    ? "neon-red  animate__animated animate__pulse animate__infinite animate__slow	"
                    : "offline animate__animated animate__pulse animate__infinite animate__slow"
                }
                form="delivery-form"
              >
                Comprar
              </button>
            </div>
          </div>
        ) : null}
        <picture>
          <source
            media="(min-width: 80svh), (min-width: 66.6vh)"
            srcSet="/img/close.svg"
          />
          <source srcSet="/img/return.svg" />

          <img
            src="/img/return.svg"
            alt="return"
            className="close"
            onClick={() => {
              setHash("");
            }}
          />
        </picture>
      </div>
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
                {flavour.required ? `-${flavour.required}` : null}
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

  const customStyles = {
    control: (base) => ({
      ...base,
      fontSize: "inherit",
      height: "min-content",
      minHeight: "auto",
    }),
    input: (base) => ({
      ...base,
      padding: "0px",
      margin: "0px",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0px",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      "& > .css-1xc3v61-indicatorContainer": {
        // Add your custom styles for the indicatorContainer here
        padding: "0px !important",
      },
    }),
  };

  return (
    <form
      id="delivery-form"
      style={{ display: props.orderFulfillment.delivery ? "grid" : "block" }}
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
        <div id="delivery-info">
          <div className="input-container barrio-select">
            <Select
              styles={customStyles}
              onChange={(selection) => {
                props.setDeliveryDetails((prev) => ({
                  ...prev,
                  barrio: selection.label,
                }));
              }}
              options={options}
              placeholder="Barrio *"
              name="Barrio"
              value={
                props.deliveryDetails
                  ? {
                      label: props.deliveryDetails.barrio,
                      value: props.deliveryDetails.barrio?.toLowerCase(),
                    }
                  : null
              }
              required
            />
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="Direccion *"
              autoComplete="street-address"
              required
              id="direccion"
              defaultValue={props.deliveryDetails?.direccion}
              onChange={(event) => {
                props.setDeliveryDetails((prev) => ({
                  ...prev,
                  direccion: event.target.value,
                }));
              }}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Entre calles *"
              required
              id="entre-calles"
              defaultValue={props.deliveryDetails?.entreCalles}
              onChange={(event) =>
                props.setDeliveryDetails((prev) => ({
                  ...prev,
                  entreCalles: event.target.value,
                }))
              }
            />
          </div>
          <div className="input-container">
            <textarea
              id="aditional-info"
              onInput={(e) => autoResize(e.target)}
              placeholder="Opcional:
														Descripcion de la casa, ejemplo: frente rojo, puerta negra de chapa."
              defaultValue={props.deliveryDetails?.aditionalInfo}
              onChange={(event) =>
                props.setDeliveryDetails((prev) => ({
                  ...prev,
                  aditionalInfo: event.target.value,
                }))
              }
            ></textarea>
          </div>
        </div>
      ) : null}
    </form>
  );
}
