import React, { useState, useEffect } from "react";
import { Botonera } from "./Botonera";
import { db, auth } from "../backend/firebase";
import { FormularioHelados } from "./FormularioHelados";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { catalog as catalogObj } from "../logic/catalog";
import { ThreeCircles } from "react-loader-spinner";

export const Shop = ({ addCartItem, addIceCream, catalog, flavours }) => {
  //content is what will be mapped
  const [content, setContent] = useState(catalog?.helados);

  //iceCreamForm content
  const [iceCreamForm, setIceCreamForm] = useState({
    show: false,

    product: undefined,
  });

  useEffect(() => {
    setContent(catalog?.helados);
  }, [catalog]);

  function closeIceCreamForm() {
    setIceCreamForm({
      show: false,

      product: undefined,
    });
  }

  function openIceCreamForm(product) {
    setIceCreamForm({
      show: true,

      product: product,
    });
  }

  return (
    <div id="shop">
      <Botonera setContent={setContent} content={content} catalog={catalog} />
      {/* switch to icecream form */}
      {iceCreamForm.show ? (
        <FormularioHelados
          flavours={flavours}
          product={iceCreamForm.product}
          close={closeIceCreamForm}
          addIceCream={addIceCream}
        />
      ) : null}

      <div className="content">
        {!content ? (
          <ThreeCircles
            height="150"
            width="150"
            color="#FF0000"
            wrapperStyle={{}}
            wrapperClass="loading"
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        ) : null}
        {content?.map((product, index) => (
          <Card
            //this key props cause useless re-renders if set to uniqid()
            key={`${index}-${product.name}`}
            product={product}
            //this props changes every time it gets used
            addCartItem={addCartItem}
            openIceCreamForm={openIceCreamForm}
          />
        ))}
      </div>
    </div>
  );
};

//this rerenders every time the addCartItem function gets called
function Card({ product, addCartItem, openIceCreamForm }) {
  const [active, setActive] = useState(false);

  /*  useEffect(() => {
    console.log("Component mounted");

    return () => {
      console.log("Component unmounted");
      console.log("---------------------");
    };
  }, []); */

  return (
    <div className="card" style={{ opacity: product.outOfStock ? 0.5 : 1 }}>
      <div className="img-container">
        <div className="points">
          <img src="/img/seal.svg" />
          <div className="text">
            <p className="points-value">{(product.price * 5) / 100}</p>
            <p className="points-string">Puntos</p>
          </div>
        </div>
        <img src={product.imgUrl} alt="" loading="lazy" />
      </div>
      <div className="product-description">
        <p className="product-name">{product.name}</p>
        <p className="product-price">$ {product.price}</p>
      </div>

      {product.flavours ? (
        <button className={`to-cart`} onClick={() => openIceCreamForm(product)}>
          Elegir sabores
        </button>
      ) : (
        <button
          disabled={product.outOfStock ? true : false}
          className={`to-cart ${active ? "active" : "inactve"}`}
          onAnimationEnd={() => {
            console.log("ani end");
            setActive(false);
          }}
          onClick={() => {
            setActive(true);
            addCartItem(product);
            console.log("ani start");
            console.log(active);
          }}
        >
          Aniadir al carrito
        </button>
      )}
    </div>
  );
}
