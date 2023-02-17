import React from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Home } from "../Home";
import { Contact } from "./Contact";
import { Shop } from "./Shop";
import { Cart } from "./Cart";

import { useState } from "react";
import { Navbar } from "./Navbar";

export const App = () => {
  const [cartItems, setCartItems] = useState([]);

  function totalItems() {
    let total = 0;
    for (var i = 0; i < cartItems.length; i++) {
      total += cartItems[i].count;
    }
    return total;
  }

  function totalPrice() {
    let total = 0;
    for (var i = 0; i < cartItems.length; i++) {
      total += cartItems[i].totalPrice;
    }
    return total;
  }

  function addCartItem(product) {
    var isProductInCart = false;
    var index = undefined;
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].name === product.name) {
        isProductInCart = true;
        index = i;
        break;
      }
    }

    if (!isProductInCart) {
      setCartItems([
        ...cartItems,
        {
          name: product.name,
          imgUrl: product.imgUrl,
          price: product.price,
          count: 1,

          get totalPrice() {
            return this.price * this.count;
          },
        },
      ]);
    } else {
      let copy = [...cartItems];
      copy[index].count = copy[index].count + 1;
      console.log(copy[index].count);

      setCartItems([...copy]);
    }
  }

  function removeCartItem(product) {
    var index = undefined;
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].name === product.name) {
        index = i;
        break;
      }
    }

    if (cartItems[index].count > 1) {
      let copy = [...cartItems];
      copy[index].count = copy[index].count - 1;

      setCartItems([...copy]);
    } else {
      let copy = [...cartItems];
      copy.splice(index, 1);
      setCartItems([...copy]);
    }
  }

  return (
    <div id="app">
      <button
        id="cart-button"
        onClick={() => {
          document.getElementById("cart").style.display = "flex";
        }}
      >
        {totalItems()} - $ {totalPrice()}
      </button>
      <Navbar />

      <Cart
        cartItems={cartItems}
        addCartItem={addCartItem}
        removeCartItem={removeCartItem}
        totalPrice={totalPrice}
      />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/tienda" element={<Shop addCartItem={addCartItem} />} />
      </Routes>
    </div>
  );
};
