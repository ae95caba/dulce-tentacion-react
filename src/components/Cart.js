import { useEffect, useState, useRef } from "react";

import uniqid from "uniqid";
import { options } from "../logic/barrios";

import { link } from "../logic/whatsappLink";

import { priceFromBarrio } from "../logic/barrios";

export function Cart({
  cartItems,
  userData,

  cartController,
}) {
  const [deliveryInfo, setDeliveryInfo] = useState({});

  //get deliveryInfo from localStorage if there is any
  //and populate form with it
  useEffect(() => {
    let deliveryInfoString = localStorage.getItem("deliveryInfo");

    if (deliveryInfoString) {
      const deliveryInfo = JSON.parse(deliveryInfoString);

      setDeliveryInfo({ ...deliveryInfo });
    }
  }, []);

  //add deliveryInfo to localStorage on every state update
  useEffect(() => {
    //save  deliveryInfo to local storage
    if (Object.keys(deliveryInfo).length > 0) {
      const deliveryInfoString = JSON.stringify(deliveryInfo);
      localStorage.setItem("deliveryInfo", deliveryInfoString);
    }

    ///////////////////////////
  }, [deliveryInfo]);

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.checkValidity()) {
      window.open(
        link(
          cartItems,
          deliveryInfo,

          cartController.getTotalItemsPrice()
        ),
        "_blank"
      );

      cartController.clearCart();
    } else {
      const formElements = e.target.elements;
      console.log(formElements);

      for (const element of formElements) {
        /*  element.checkValidity();
        console.log("as"); */
        e.target.reportValidity();
      }
    }
  }

  ///////////////////////////
  return (
    <div id="cart">
      <h1>Tu carrito</h1>

      {cartItems.length > 0 ? (
        <>
          <section className="cart-items">
            {cartItems.map((cartItem, index) => {
              return (
                //fixed bug, do not use uniqid on the key or the images will refresh every time the delivery option changes
                <CartItem
                  cartItem={cartItem}
                  key={`cart-item-${index}`}
                  cartController={cartController}
                />
              );
            })}
          </section>
          <DeliveryForm
            handleSubmit={handleSubmit}
            deliveryInfo={deliveryInfo}
            setDeliveryInfo={setDeliveryInfo}
          />
          <Checkout
            getTotalItemsPrice={cartController.getTotalItemsPrice}
            deliveryInfo={deliveryInfo}
          />
        </>
      ) : (
        <p id="empty">No hay nada aca, porque no agregas algo?</p>
      )}
    </div>
  );
}

function Checkout({ getTotalItemsPrice, deliveryInfo }) {
  function getDeliveryPrice() {
    if (deliveryInfo.neighborhood && deliveryInfo.isChecked) {
      return priceFromBarrio(deliveryInfo.neighborhood);
    } else {
      return 0;
    }
  }

  return (
    <section className="checkout">
      <h3>Detalle: </h3>

      <div className="container">
        <p>
          Productos: <span>$ {getTotalItemsPrice()}</span>
        </p>
        <p>
          Envio:
          <span>$ {getDeliveryPrice()}</span>
        </p>
        <p>
          Total a pagar:
          <span>${getTotalItemsPrice() + getDeliveryPrice()}</span>
        </p>
      </div>

      <button type="submit" form="delivery-form">
        Comprar
      </button>
    </section>
  );
}

function Details({ product }) {
  return (
    <div className="details">
      <h3>Sabores</h3>
      <ul>
        {product.flavours.map((flavour) => {
          return <li key={uniqid()}>{flavour}</li>;
        })}
      </ul>
    </div>
  );
}

function CartItem({ cartController, cartItem }) {
  const [showDetails, setShowDetails] = useState(false);
  const product = cartItem.product;
  return (
    <div className="cart-item">
      <img
        className="remove"
        alt="remove"
        src="/img/recycle-bin.png"
        onClick={() => cartController.removeAll(cartItem)}
      />
      <div className="left">
        <img className="thumbnail" src={product.imgUrl} alt={product.name} />
      </div>
      <div className="right">
        <div className="description">
          <p>{product.name}</p>
          <p>$ {cartItem.getTotalPrice()}</p>
        </div>

        {!product.flavours ? (
          <div className="quantity">
            <button
              onClick={() => {
                cartController.removeOne(cartItem);
              }}
            >
              -
            </button>
            <span>unidades: {cartItem.count}</span>
            <button
              onClick={() => {
                cartController.addProduct(product);
              }}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="details-button"
            onClick={() => setShowDetails((prev) => !prev)}
          >
            Detalle
          </button>
        )}
      </div>
      {showDetails && <Details product={product} />}
    </div>
  );
}

function DeliveryForm({ handleSubmit, setDeliveryInfo, deliveryInfo }) {
  function checkValidity(e) {
    const isValid = e.target.validity.valid;

    //const checksPassed = checks.filter((check) => validity[check]).length === 0;
    if (!isValid) {
      e.target.classList.add("invalid");
    } else {
      e.target.classList.remove("invalid");
    }
  }

  return (
    <form
      noValidate
      id="delivery-form"
      autoComplete="on"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="options">
        <label className="option" htmlFor="pickup">
          <span>Retiro en el local</span>
          <input
            type="radio"
            name="fullfillment-method"
            value="pickup"
            id="pickup"
            onChange={() =>
              setDeliveryInfo((prev) => ({ ...prev, isChecked: false }))
            }
            checked={!deliveryInfo.isChecked}
            required
          />
        </label>

        <label className="option" htmlFor="delivery">
          <span>Envio a domicilio</span>
          <input
            type="radio"
            name="fullfillment-method"
            value="delivery"
            id="delivery"
            checked={deliveryInfo.isChecked}
            onChange={() => {
              setDeliveryInfo((prev) => ({ ...prev, isChecked: true }));
            }}
            required
          />
        </label>
      </div>

      {deliveryInfo.isChecked && (
        <div id="delivery-info">
          <div className="container">
            <select
              name="Barrio"
              value={deliveryInfo.neighborhood}
              required
              onChange={(e) => {
                const selectedValue = e.target.value;
                setDeliveryInfo((prev) => ({
                  ...prev,
                  neighborhood: selectedValue,
                }));
              }}
            >
              <option value="" disabled selected>
                Elige un barrio *
              </option>
              {options.map((option) => (
                <option value={option}>{option}</option>
              ))}
            </select>

            <div className="error">Seleciona un barrio</div>
          </div>

          <div className="container">
            <input
              type="text"
              placeholder="Direccion *"
              autoComplete="street-address"
              required
              onBlur={checkValidity}
              defaultValue={deliveryInfo.address}
              onChange={(event) => {
                setDeliveryInfo((prev) => ({
                  ...prev,
                  address: event.target.value,
                }));
              }}
            />

            <div className="error">Escribe una direccion</div>
          </div>

          <div className="container">
            <input
              type="text"
              placeholder="Entre calles *"
              required
              onBlur={checkValidity}
              defaultValue={deliveryInfo.crossStreets}
              onChange={(event) =>
                setDeliveryInfo((prev) => ({
                  ...prev,
                  crossStreets: event.target.value,
                }))
              }
            />

            <div className="error">Escribe las entrecalles</div>
          </div>

          <textarea
            id="aditional-info"
            placeholder="Opcional:
														Descripcion de la casa, ejemplo: frente rojo, puerta negra de chapa."
            defaultValue={deliveryInfo.aditionalInfo}
            onChange={(event) =>
              setDeliveryInfo((prev) => ({
                ...prev,
                aditionalInfo: event.target.value,
              }))
            }
          ></textarea>
        </div>
      )}
    </form>
  );
}
