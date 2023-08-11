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

  useEffect(() => {}, [deliveryInfo]);

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

    window.open(
      link(
        cartItems,
        deliveryInfo,

        cartController.getTotalItemsPrice()
      ),
      "_blank"
    );

    cartController.clearCart();
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
      <div className="flavours">
        <h3>Sabores</h3>
        <div>
          {product.flavours.map((flavour) => {
            return <p key={uniqid()}>{flavour}</p>;
          })}
        </div>
      </div>
      {product.extras?.rocklets.isChecked ||
      product.extras?.salsa.type ||
      product.extras?.conos.count ? (
        <div className="extras">
          <div className="tittle">Extras</div>
          <div className="extras-body">
            {product.extras.rocklets.isChecked ? <div>Rocklets</div> : null}
            {product.extras.salsa.type ? (
              <div>Salsa de {product.extras.salsa.type}</div>
            ) : null}
            {product.extras.conos.count ? (
              <div> {product.extras.conos.count} conos</div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function CartItem({ cartController, cartItem }) {
  const [showDetails, setShowDetails] = useState(false);
  const product = cartItem.product;
  return (
    <div className="cart-item">
      <div className="left">
        <img className="thumbnail" src={product.imgUrl} alt={product.name} />
        <img
          className="remove"
          alt="remove"
          src="/img/recycle-bin.svg"
          onClick={() => cartController.removeAll(cartItem)}
        />
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
  return (
    <form
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

          <input
            type="text"
            placeholder="Direccion *"
            autoComplete="street-address"
            required
            defaultValue={deliveryInfo.address}
            onChange={(event) => {
              setDeliveryInfo((prev) => ({
                ...prev,
                address: event.target.value,
              }));
            }}
          />

          <input
            type="text"
            placeholder="Entre calles *"
            required
            defaultValue={deliveryInfo.crossStreets}
            onChange={(event) =>
              setDeliveryInfo((prev) => ({
                ...prev,
                crossStreets: event.target.value,
              }))
            }
          />

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
