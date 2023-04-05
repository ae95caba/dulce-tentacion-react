import "../App.scss";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Home } from "../Home";
import { Profile } from "./Profile";
import { Shop } from "./Shop";
import { Cart } from "./Cart";

import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { ThanksMessage } from "./ThanksMessage";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../backend/firebase";

export const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [showThanksMessage, setShowThanksMessage] = useState(false);
  const [isUserOnline, setIsUserOnline] = useState();
  const [isABuyPending, setIsABuyPending] = useState(false);
  const [cartDisplayProperty, setCartDisplayProperty] = useState("none");
  const [catalog, setCatalog] = useState(null);
  const [userData, setUserData] = useState({
    name: undefined,
    email: undefined,
    img: "/img/anonymous.svg",
  });
  const [flavours, setFlavours] = useState(null);

  useEffect(() => {
    function convertStringToArray(string) {
      // Remove leading and trailing periods and whitespaces
      string = string.trim().replace(/^\.+|\.+$/g, "");

      // Split the string by periods and whitespaces
      const items = string.split(/\s*\.\s*/);

      // Filter out any empty items
      const filteredItems = items.filter((item) => item !== "");

      return filteredItems;
    }
    async function as() {
      const docRef = doc(db, "shop", "catalog");
      const docSnap = await getDoc(docRef);
      setCatalog(docSnap.data().products);
      setFlavours(convertStringToArray(docSnap.data().flavours));
    }
    as();
  }, []);

  useEffect(() => {
    // Set the overflow of the body element based on the display value
    document.body.style.overflow =
      cartDisplayProperty === "none" ? "auto" : "hidden";
  }, [cartDisplayProperty]);

  //after the user logs in, it check if there is a a buy pending to show the cart
  useEffect(() => {
    //no nned to add if(isUserOnline) because if the user was online setIsABuyPending wont be set in the frist place
    if (isABuyPending) {
      setCartDisplayProperty("flex");

      setIsABuyPending(false);
    }
  }, [isUserOnline]);

  //set isUserOnline and userData
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("there is a user online");
      } else {
        console.log("no user online");
      }

      if (user) {
        setIsUserOnline(true);

        setUserData({
          name: user.displayName,
          email: user.email,
          img: user.photoURL,
        });
      } else {
        setIsUserOnline(false);
      }
    });
  }, []);

  function totalItems() {
    let total = 0;
    for (var i = 0; i < cartItems.length; i++) {
      total += cartItems[i].count;
    }
    return total;
  }

  function totalPrice() {
    let total = 0;

    total += deliveryPrice;
    for (var i = 0; i < cartItems.length; i++) {
      total += cartItems[i].totalPrice;
    }
    return total;
  }

  //increases a cart item count if the item is in the cart
  //if the item was no in the cart (its just been added) it adds it to cartItems array
  const addCartItem = (product) => {
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

      setCartItems([...copy]);
    }
  };
  const addIceCream = (iceCream) => {
    setCartItems([
      ...cartItems,
      {
        ...iceCream,
      },
    ]);
  };

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

  function removeAll(product) {
    let index = cartItems.indexOf(product);

    let copy = [...cartItems];
    copy.splice(index, 1);
    setCartItems([...copy]);
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <div id="app">
      <div
        id="cart-button"
        onClick={() => {
          /*   document.body.style.overflow = "hidden";
           document.getElementById("cart").style.display = "flex";  */
          setCartDisplayProperty("flex");
        }}
      >
        <img src="/img/cart.svg" alt="shopping cart"></img>
        <div id="total-items">{totalItems()}</div>
        <div id="total-price">$ {totalPrice()}</div>
      </div>
      <Navbar isUserOnline={isUserOnline} />
      {showThanksMessage ? (
        <ThanksMessage close={() => setShowThanksMessage(false)} />
      ) : null}

      <Cart
        cartDisplayProperty={cartDisplayProperty}
        setCartDisplayProperty={setCartDisplayProperty}
        setIsABuyPending={setIsABuyPending}
        userData={userData}
        isUserOnline={isUserOnline}
        setDeliveryPrice={setDeliveryPrice}
        cartItems={cartItems}
        addCartItem={addCartItem}
        removeCartItem={removeCartItem}
        removeAll={removeAll}
        clearCart={clearCart}
        totalPrice={totalPrice}
        showThanksMessage={() => {
          console.log("holaaaaa");
          setShowThanksMessage(true);
        }}
      />
      <Routes>
        <Route path="/" exact element={<Home />} />

        <Route
          path="/perfil"
          element={
            <Profile
              userData={userData}
              setUserData={setUserData}
              isUserOnline={isUserOnline}
            />
          }
        />

        <Route
          path="/tienda"
          element={
            <Shop
              flavours={flavours}
              catalog={catalog}
              addCartItem={addCartItem}
              addIceCream={addIceCream}
            />
          }
        />
      </Routes>
    </div>
  );
};
