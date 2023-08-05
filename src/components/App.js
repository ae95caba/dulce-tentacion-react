import "../App.scss";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Home } from "./Home";
import Footer from "./Footer";
import { Shop } from "./Shop";
import { Cart } from "./Cart";
import { useHash } from "react-use";

import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";

import { setDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../backend/firebase";

export const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [showThanksMessage, setShowThanksMessage] = useState(false);
  const [isUserOnline, setIsUserOnline] = useState();
  const [iceCreamExtras, setIceCreamExtras] = useState(null);
  const [cartDisplayProperty, setCartDisplayProperty] = useState("none");
  const [catalog, setCatalog] = useState(null);
  const [userData, setUserData] = useState({
    name: undefined,
    email: undefined,
    img: "/img/anonymous.svg",
  });
  const [flavours, setFlavours] = useState(null);

  //populate products, ice cream extras and flavours with firestore db
  useEffect(() => {
    const MAX_REFRESHES = 3; // Maximum number of refresh attempts
    const REFRESH_DELAY = 2000; // Delay in milliseconds before each refresh
    let refreshCount = 0;

    function convertStringToArray(string) {
      // Remove leading and trailing periods and whitespaces
      string = string.trim().replace(/^\.+|\.+$/g, "");

      // Split the string by periods and whitespaces
      const items = string.split(/\s*\.\s*/);

      // Filter out any empty items
      const filteredItems = items.filter((item) => item !== "");

      return filteredItems;
    }

    async function populateCatalog() {
      try {
        const docRef = doc(db, "shop", "catalog");
        const docSnap = await getDoc(docRef);
        ///

        let helados = docSnap.data().products.helados;
        let escabio = docSnap.data().products.escabio;

        setCatalog({
          helados: [...helados, ...helados, ...helados],
          escabio: escabio,
        });
        setFlavours(convertStringToArray(docSnap.data().flavours));
        setIceCreamExtras(docSnap.data().iceCreamExtras);
      } catch (error) {
        if (refreshCount < MAX_REFRESHES) {
          refreshCount++;
          setTimeout(() => {
            window.location.reload();
          }, REFRESH_DELAY);
        } else {
          // Handle the maximum refresh attempts reached
          console.log(
            "Maximum refresh attempts reached. Please try again later."
          );
          alert("Estamos teniendo problemas. Por favor intenta mas tarde");
        }
      }
    }
    populateCatalog();
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
    <>
      <Navbar
        isUserOnline={isUserOnline}
        cartDisplayProperty={cartDisplayProperty}
        totalItems={totalItems}
        totalPrice={totalPrice}
      />

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

      <section className="content">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="/catalogo"
            element={
              <Shop
                flavours={flavours}
                iceCreamExtras={iceCreamExtras}
                catalog={catalog}
                addCartItem={addCartItem}
                addIceCream={addIceCream}
              />
            }
          />
        </Routes>
      </section>

      <Footer />
    </>
  );
};
