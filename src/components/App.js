import React from "react";
import "../App.scss";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Home } from "../Home";
import { Profile } from "./Profile";
import { Shop } from "./Shop";
import { Cart } from "./Cart";

import { useState } from "react";
import { Navbar } from "./Navbar";
import { SignUp } from "./SignUp";
import { LogIn } from "./LogIn";
import { ThanksMessage } from "./ThanksMessage";

export const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showThanksMessage, setShowThanksMessage] = useState(false);

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

  //increases a cart item count if the item is in the cart
  //if the item was no in the cart (its just been added) it adds it to cartItems array
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
      // INCREASE COUNT BY 1
      let copy = [...cartItems];
      copy[index].count = copy[index].count + 1;
      console.log(copy[index].count);

      setCartItems([...copy]);
    }
  }

  //	decreases a cart item count
  //if the is only only the removes it entirely
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

  function clearCart() {
    setCartItems([]);
  }

  return (
    <div id="app">
      <div
        id="cart-button"
        onClick={() => {
          document.getElementById("cart").style.display = "flex";
        }}
      >
        <img src="/img/cart.svg" alt="shopping cart"></img>
        <div id="total-items">{totalItems()}</div>
        <div id="total-price">$ {totalPrice()}</div>
      </div>
      <Navbar />
      {showThanksMessage ? (
        <ThanksMessage close={() => setShowThanksMessage(false)} />
      ) : null}

      <Cart
        cartItems={cartItems}
        addCartItem={addCartItem}
        removeCartItem={removeCartItem}
        clearCart={clearCart}
        totalPrice={totalPrice}
        showThanksMessage={() => {
          console.log("holaaaaa");
          setShowThanksMessage(true);
        }}
      />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/perfil/crear-cuenta" element={<SignUp />} />
        <Route path="/perfil/iniciar-sesion" element={<LogIn />} />
        <Route path="/tienda" element={<Shop addCartItem={addCartItem} />} />
      </Routes>
    </div>
  );
};
