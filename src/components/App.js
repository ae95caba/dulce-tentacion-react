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
import Gallery from "./Gallery";
import We from "./We";
import FlavoursList from "./FlavoursList";

export const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [catalog, setCatalog] = useState(null);
  const checkMarkRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  //shows checkmark modal on the catalog tab
  useEffect(() => {
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

        let iceCream = docSnap.data().products.helados;

        let iceCreamExtras = docSnap.data().iceCreamExtras;
        let flavoursList = convertStringToArray(docSnap.data().flavours);
        setCatalog({
          iceCream,
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
        <div
          style={{ width: "100%", aspectRatio: "2/1" }}
          className="img-loader-container"
        >
          <span className="loader"></span>
        </div>
      ) : (
        <MainContent
          location={location}
          cartController={cartController}
          catalog={catalog}
          cartItems={cartItems}
        />
      )}
      <Footer />
    </>
  );
};

function MainContent({ cartController, catalog, cartItems, location }) {
  function getClassName() {
    let result;

    switch (location.pathname) {
      case "/catalogo":
        result = "catalog";
        break;
      case "/galeria":
        result = "gallery";
        break;
      case "/carrito":
        result = "cart";
        break;
      case "/nosotros":
        result = "we";
        break;
      case "/helados":
        result = "form";
        break;
      case "/":
        result = "home";
        break;

      default:
        console.log("That's not a valid day.");
    }
    return result;
  }
  return (
    <main className={`content ${getClassName()} `}>
      <Routes>
        <Route path="/" exact element={<Home iceCream={catalog.iceCream} />} />
        <Route path="/nosotros" exact element={<We />} />
        <Route path="/galeria" exact element={<Gallery />} />
        <Route
          path="/carrito"
          exact
          element={
            <Cart cartItems={cartItems} cartController={cartController} />
          }
        />
        <Route
          path="/sabores"
          exact
          element={<FlavoursList flavoursList={catalog.flavoursList} />}
        />
        <Route
          path="/catalogo"
          element={
            <Shop
              iceCream={catalog.iceCream}
              addProduct={cartController.addProduct}
            />
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
