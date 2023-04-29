import "../App.scss";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Home } from "../Home";
import { Profile } from "./Profile";
import { Shop } from "./Shop";
import { Cart } from "./Cart";
import { useHash } from "react-use";

import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { ThanksMessage } from "./ThanksMessage";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../backend/firebase";
import { addProductsToFirestore } from "../backend/addCatalogToFirestore";
import {
  fetchData,
  fetchProductsJSON,
  productsObj,
} from "../logic/productsObj";

export const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [showThanksMessage, setShowThanksMessage] = useState(false);
  const [isUserOnline, setIsUserOnline] = useState();

  const [cartDisplayProperty, setCartDisplayProperty] = useState("none");
  const [catalog, setCatalog] = useState(null);
  const [userData, setUserData] = useState({
    name: undefined,
    email: undefined,
    img: "/img/anonymous.svg",
  });
  const [flavours, setFlavours] = useState(null);

  /* addProductsToFirestore(productsObj); */
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
    function sortObjectsByName(objects) {
      return objects.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // convert to uppercase to make sorting case-insensitive
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1; // nameA comes before nameB
        }
        if (nameA > nameB) {
          return 1; // nameA comes after nameB
        }
        return 0; // names are equal
      });
    }
    async function as() {
      try {
        const docRef = doc(db, "shop", "catalog");
        const docSnap = await getDoc(docRef);
        ///

        let helados = docSnap.data().products.helados;
        let escabio = docSnap.data().products.escabio;
        /* let sortedHelados = sortObjectsByName(helados);
      let sortedEscabio = sortObjectsByName(escabio);
      let sortedProducts = { helados: sortedHelados, escabio: sortedEscabio };
      setCatalog(sortedProducts); */
        setCatalog({ helados: helados, escabio: escabio });
        setFlavours(convertStringToArray(docSnap.data().flavours));
      } catch (error) {
        alert(error);
      }
    }
    as();
  }, []);

  useEffect(() => {
    // Set the overflow of the body element based on the display value
    document.body.style.overflow =
      cartDisplayProperty === "none" ? "auto" : "hidden";
    //set the hash based on the displayProperty
  }, [cartDisplayProperty]);

  //set isUserOnline and userData
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUserOnline(true);

        setUserData({
          name: user.displayName,
          email: user.email,
          img: user.photoURL,
        });
      } else {
        setIsUserOnline(false);
        setUserData({
          name: undefined,
          email: undefined,
          img: "/img/anonymous.svg",
        });
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

    total += cartItems.length > 0 ? deliveryPrice : 0;
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
      <a
        /*  the following could me unnecesary but better keep it */
        href={cartDisplayProperty === "flex" ? "javascript:void(0)" : "#cart"}
        className={
          totalItems() > 0
            ? "animate__animated animate__pulse animate__infinite animate__slower	"
            : null
        }
        id="cart-button"
        onClick={() => {}}
      >
        <div style={{ position: "relative" }}>
          <img src="/img/cart.svg" alt="shopping cart" />
          <div id="total-items" className="neon-green">
            {totalItems() > 0 ? totalItems() : null}
          </div>
        </div>

        <div
          id="total-price"
          className="neon-green"
          style={{ visibility: totalPrice() ? "visible" : "hidden" }}
        >
          $ {totalPrice()}
        </div>
      </a>
      <Navbar isUserOnline={isUserOnline} />
      {showThanksMessage ? (
        <ThanksMessage close={() => setShowThanksMessage(false)} />
      ) : null}

      <Cart
        cartDisplayProperty={cartDisplayProperty}
        setCartDisplayProperty={setCartDisplayProperty}
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
