import "../App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import IceCreamForm from "./IceCreamForm";
import { Home } from "./Home";
import Footer from "./Footer";
import { Shop } from "./Shop";
import { Cart } from "./Cart";

import { useState, useEffect, useRef } from "react";
import { Header } from "./Header";

import { setDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../backend/firebase";

export const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [catalog, setCatalog] = useState(null);
  const checkMarkRef = useRef();

  useEffect(() => {
    console.log(location);
    if (location.pathname === "/catalogo") {
      checkMarkRef.current.showModal();

      setTimeout(() => {
        checkMarkRef.current.close();
      }, 1000);
    }
  }, [cartItems, checkMarkRef]);

  //populate products, ice cream extras and flavours with firestore db
  useEffect(() => {
    const MAX_REFRESHES = 3; // Maximum number of refresh attempts
    const REFRESH_DELAY = 1000; // Delay in milliseconds before each refresh
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

        let helados = docSnap.data().products.helados;

        let iceCreamExtras = docSnap.data().iceCreamExtras;
        let flavoursList = convertStringToArray(docSnap.data().flavours);
        setCatalog({
          helados,
          iceCreamExtras,
          flavoursList,
        });
        setIsLoading(false);
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

  const cartController = {
    addProduct: function (product) {
      function getIndexOfProduct() {
        let index = -1;
        for (var i = 0; i < cartItems.length; i++) {
          if (cartItems[i].product.name === product.name) {
            index = i;
            break;
          }
        }
        return index;
      }
      const isProductInCart = getIndexOfProduct() >= 0;
      const isIceCream = product.hasOwnProperty("flavours");

      function increaseCount(product) {
        let cartItemsCopy = [...cartItems];
        cartItemsCopy[getIndexOfProduct()].count++;

        setCartItems([...cartItemsCopy]);
      }

      function newCartItem(product) {
        return {
          product,
          count: 1,
          getTotalPrice() {
            return this.product.price * this.count;
          },
        };
      }

      if (isProductInCart) {
        if (isIceCream) {
          setCartItems([...cartItems, newCartItem(product)]);
        } else {
          increaseCount(product);
        }
      } else {
        setCartItems([...cartItems, newCartItem(product)]);
      }
    },
    removeAll: function (product) {
      let index = cartItems.indexOf(product);

      let copy = [...cartItems];
      copy.splice(index, 1);
      setCartItems([...copy]);
    },
    removeOne: function (product) {
      let index = cartItems.indexOf(product);

      let copy = [...cartItems];

      if (copy[index].count > 1) {
        copy[index].count--;
        setCartItems([...copy]);
      } else {
        copy.splice(index, 1);
        setCartItems([...copy]);
      }
    },
    clearCart: function () {
      setCartItems([]);
    },
    getTotalItemsPrice: function () {
      let total = 0;

      for (var i = 0; i < cartItems.length; i++) {
        total += cartItems[i].getTotalPrice();
      }
      return total;
    },
    getTotalItems: function () {
      let total = 0;
      for (var i = 0; i < cartItems.length; i++) {
        total += cartItems[i].count;
      }
      return total;
    },
  };

  return (
    <>
      <dialog tabIndex="-1" ref={checkMarkRef} className="checkmark">
        <img tabIndex="-1" src="/checkmark.png" alt="" srcset="" />
      </dialog>

      <Header getTotalCartItems={cartController.getTotalItems} />
      {isLoading ? (
        "Loading..."
      ) : (
        <MainContent
          cartController={cartController}
          catalog={catalog}
          cartItems={cartItems}
        />
      )}
      <Footer />
    </>
  );
};

function MainContent({ cartController, catalog, cartItems }) {
  return (
    <main className="content">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/nosotros" exact element={<Home />} />
        <Route
          path="/carrito"
          exact
          element={
            <Cart cartItems={cartItems} cartController={cartController} />
          }
        />
        <Route path="/testimonios" exact element={<Home />} />
        <Route
          path="/catalogo"
          element={
            <Shop catalog={catalog} addProduct={cartController.addProduct} />
          }
        />
        <Route
          path="/catalogo/helado/:maxFlavours"
          element={
            <IceCreamForm
              catalog={catalog}
              addProduct={cartController.addProduct}
            />
          }
        />
      </Routes>
    </main>
  );
}
