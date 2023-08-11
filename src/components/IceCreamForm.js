import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import React from "react";

export default function IceCreamForm({
  catalog,

  addProduct,
}) {
  const { maxFlavours } = useParams();

  //const product = location.state;
  const product = getProduct();
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const [choosenFlavours, setChoosenFlavours] = useState([]);
  const [extras, setExtras] = useState({});

  function getProduct() {
    for (const key in catalog.helados) {
      if (catalog.helados[key].flavours === +maxFlavours) {
        console.log(catalog.helados[key]);
        return catalog.helados[key];
      }
    }
  }

  function handleChange(e) {
    const { value, checked } = e.target;

    if (checked) {
      setChoosenFlavours((prev) => [...prev, value]);
    } else {
      const index = choosenFlavours.indexOf(value);
      const copy = choosenFlavours;
      copy.splice(index, 1);

      setChoosenFlavours([...copy]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (choosenFlavours.length > 0) {
      addProduct({ ...product, flavours: choosenFlavours });
      navigate("/catalogo");
    } else {
      modalRef.current.showModal();
    }
  }

  return (
    <form id="ice-cream" onSubmit={handleSubmit}>
      <h1>{product.name}</h1>
      <h2>
        Sabores
        <span>
          {choosenFlavours.length}/{product.flavours}
        </span>
      </h2>
      <div className="container">
        {catalog.flavoursList.map((flavourValue) => (
          <label key={flavourValue} htmlFor={flavourValue}>
            <span>{flavourValue}</span>

            <input
              id={flavourValue}
              type="checkbox"
              disabled={
                !choosenFlavours.includes(flavourValue) &&
                choosenFlavours.length >= product.flavours
              }
              name="flavour"
              value={flavourValue}
              onChange={handleChange}
            />
          </label>
        ))}
      </div>

      <dialog ref={modalRef}>
        <p>Debes elegir por lo menos un sabor</p>
        <button
          type="button"
          onClick={() => {
            modalRef.current.close();
          }}
        >
          Ok
        </button>
      </dialog>

      <button>Aceptar</button>
    </form>
  );
}
