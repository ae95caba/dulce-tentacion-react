import { useEffect, useState, useRef } from "react";
import { useHash } from "react-use";
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
  const [barrioElegido, setBarrioElegido] = useState(null); // Set default option
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [orderFulfillment, setOrderFulfillment] = useState({
    delivery: false,
    pickup: false,
  });

  const [hash, setHash] = useHash(null);

  //get deliveryDetails from localStorage if there is any
  useEffect(() => {
    let detailsString = localStorage.getItem("deliveryDetails");
    /*  alert("mount"); */

    if (detailsString) {
      const details = JSON.parse(detailsString);

      setDeliveryDetails({ ...details });
      if (details.barrio) {
        const barrioObj = {
          value: details.barrio.toLowerCase(),
          label: details.barrio,
        };

        setBarrioElegido(barrioObj);
      }
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
    if (hash === "" && props.cartDisplayProperty === "flex") {
      console.log("hash runing");
      animateAndClose();
    } else if (hash === "#cart") {
      console.log("show cart");
      props.setCartDisplayProperty("flex");
    }
  }, [hash]);

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
      props.showThanksMessage();
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
    ref.current.classList.remove("animate__animated", "animate__fadeInRight");
    ref.current.classList.add("animate__animated", "animate__fadeOutRight");
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
          ? "animate__animated animate__fadeInRight"
          : ""
      }
      style={{ display: props.cartDisplayProperty }}
    >
      <h1>Tu carrito</h1>
      <div className="cart-body">
        {props.cartItems.length > 0 ? (
          props.cartItems.map((item) => {
            const detailsId = uniqid();

            return (
              <div className="cart-item" key={uniqid()}>
                <img src={item.imgUrl} alt={item.name} />
                <div className="right">
                  <img
                    className="remove"
                    src="/img/recycle-bin.svg"
                    onClick={() => props.removeAll(item)}
                  />

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
      {/*  {props.cartItems.length > 0 ? (
        <div className="total-points">
          Ganas <span className="number">{(props.totalPrice() / 100) * 5}</span>{" "}
          puntos !
        </div>
      ) : null} */}
      {props.cartItems.length > 0 ? (
        <DeliveryForm
          isUserOnline={props.isUserOnline}
          ///
          setBarrioElegido={setBarrioElegido}
          barrioElegido={barrioElegido}
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
      <img
        src="/img/return.svg"
        alt="return"
        className="close"
        onClick={() => {
          setHash("");
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
      fontSize: "  clamp(1rem, 6vw, 6rem);",
      padding: "0px", // use clamp function to set font size
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
          <div className="input-container">
            <Select
              styles={customStyles}
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
