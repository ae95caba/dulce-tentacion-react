import React, { useState, useEffect, useRef } from "react";

import { Route, Routes, NavLink } from "react-router-dom";

import Image from "./Image";

export const Shop = ({
  addProduct,

  iceCream,
}) => {
  return (
    <>
      <h1>Catalogo</h1>
      <div className="cards-container">
        {iceCream?.map((product, index) => {
          if (product.outOfStock) {
            return "";
          }

          const cartComponent = (
            <Card
              //this key props cause useless re-renders if set to uniqid()
              key={`${index}-card-${product.name}`}
              product={product}
            />
          );

          return product.hasOwnProperty("flavours") ? (
            <NavLink
              state={product}
              to={`/catalogo/helado/${product.flavours}`}
            >
              {cartComponent}
            </NavLink>
          ) : (
            <div onClick={() => addProduct(product)}>{cartComponent}</div>
          );
        })}
      </div>
    </>
  );
};

//this rerenders every time the addProductToCart function gets called
function Card({ product }) {
  return (
    <div className="card">
      <Image url={product.imgUrl} />
      <p className="product-name">{product.name}</p>
      <p className="product-price">$ {product.price}</p>

      <button className={`to-cart  `}>
        <span>Añadir</span>

        <img
          style={{ filter: "invert(1)" }}
          src="/img/to-cart.svg"
          alt="cart icon"
        />
      </button>
    </div>
  );
}
