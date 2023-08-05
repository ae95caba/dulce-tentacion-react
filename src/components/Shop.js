import React, { useState, useEffect, useRef } from "react";

import { FormularioHelados } from "./FormularioHelados";

import { ThreeCircles } from "react-loader-spinner";
import { useHash } from "react-use";

export const Shop = ({
  addCartItem,
  iceCreamExtras,
  addIceCream,
  catalog,
  flavours,
}) => {
  //content is what will be mapped
  const [content, setContent] = useState(catalog?.helados);
  const [hash, setHash] = useHash(null);
  //searchTerm is what fuse will look for

  const [currentCategoryName, setCurrentCategoryName] = useState(null);
  //iceCreamForm content
  //it needs the hole product so it can pass it to the car
  const [iceCreamForm, setIceCreamForm] = useState(null);

  //this changes the display property of the form to flex
  //when hash matches form and the is product info on the form state
  useEffect(() => {
    if (
      hash === "#formulario-helados" &&
      iceCreamForm?.product &&
      iceCreamForm?.display !== "flex"
    ) {
      setIceCreamForm((prev) => ({ ...prev, display: "flex" }));
    }
  }, [hash, iceCreamForm]);

  useEffect(() => {
    if (content?.length === catalog?.helados.length) {
      setCurrentCategoryName("helados");
    } else if (content?.length === catalog?.escabio.length) {
      setCurrentCategoryName("bebidas");
    }
  }, [content]);

  useEffect(() => {
    setContent(catalog?.helados);
  }, [catalog]);

  return (
    <>
      {/* show icecream form over content cards*/}
      {iceCreamForm?.render ? (
        <FormularioHelados
          flavours={flavours}
          iceCreamExtras={iceCreamExtras}
          iceCreamForm={iceCreamForm}
          setIceCreamForm={setIceCreamForm}
          addIceCream={addIceCream}
        />
      ) : null}
      <h1>Nuestros productos</h1>
      <div className="cards-container">
        {!content && !catalog ? (
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

        {content?.map((product, index) =>
          !product.outOfStock ? (
            <Card
              //this key props cause useless re-renders if set to uniqid()
              key={`${index}-card-${product.name}`}
              index={`${index}`}
              product={product}
              iceCreamForm={iceCreamForm}
              //this props changes every time it gets used
              addCartItem={addCartItem}
              setIceCreamForm={setIceCreamForm}
            />
          ) : null
        )}
      </div>
    </>
  );
};

//this rerenders every time the addCartItem function gets called
function Card({
  product,
  addCartItem,

  setIceCreamForm,
  iceCreamForm,
  index,
}) {
  const [active, setActive] = useState(false);
  const [hash, setHash] = useHash(null);
  return (
    <div
      className="card"
      id={`card-${index}`}
      style={{ opacity: product.outOfStock ? 0.5 : 1 }}
    >
      <Image url={product.imgUrl} />

      <p className="product-name">{product.name}</p>
      <p className="product-price">$ {product.price}</p>

      {product.flavours ? (
        <button
          className={`to-cart  `}
          disabled={iceCreamForm?.display === "flex" ? true : false}
          onClick={() => {
            setHash("#formulario-helados");
            setIceCreamForm((prev) => ({
              ...prev,
              product: product,
              render: true,
            }));
          }}
        >
          <span>Añadir</span>
          <div className="img-container">
            <img
              style={{ filter: "invert(1)" }}
              src="/img/to-cart.svg"
              alt="cart icon"
            />
          </div>
        </button>
      ) : (
        <button
          disabled={product.outOfStock ? true : false}
          className={`to-cart ${active ? "active" : "inactve"}`}
          onAnimationEnd={() => {
            setActive(false);
          }}
          onClick={() => {
            setActive(true);
            addCartItem(product);
          }}
        >
          <span>Añadir</span>
          <div className="img-container">
            <img
              style={{ filter: "invert(1)" }}
              src="/img/to-cart.svg"
              alt="cart icon"
            />
          </div>
        </button>
      )}
    </div>
  );
}

function Image({ url }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = () => {
    console.log("loaded");
    setIsLoaded(true);
  };

  return (
    <div className="img-container">
      <img
        src={url}
        onLoad={onLoad}
        alt="product"
        style={{ visibility: isLoaded ? "visible" : "hidden" }}
      />
      <span
        className="loader"
        style={{ display: !isLoaded ? "block" : "none" }}
      ></span>
    </div>
  );
}
export default Image;
