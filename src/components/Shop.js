import React, { useState, useEffect, useRef } from "react";
import { Botonera } from "./Botonera";
import Fuse from "fuse.js";
import { FormularioHelados } from "./FormularioHelados";
import Select from "react-select";
import { ThreeCircles } from "react-loader-spinner";
import { useHash } from "react-use";

export const Shop = ({ addCartItem, addIceCream, catalog, flavours }) => {
  //content is what will be mapped
  const [content, setContent] = useState(catalog?.helados);
  const [hash, setHash] = useHash(null);
  //searchTerm is what fuse will look for
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const searchboxSelectRef = useRef(null);
  const [currentCategoryName, setCurrentCategoryName] = useState(null);
  //iceCreamForm content
  //it needs the hole product so it can pass it to the car
  const [iceCreamForm, setIceCreamForm] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      const element = document.getElementById(selectedProduct.value);

      const container = document.querySelector(".content");
      const position = element.offsetTop - 50;

      container.scrollTo({
        top: position,
        behavior: "smooth",
      });
    }
  }, [selectedProduct]);

  //this changes the display property of the form to flex
  //when hash matches form and the is product info on the form state
  useEffect(() => {
    if (hash === "#formulario-helados" && iceCreamForm) {
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

  //fuse option

  //fuse setup
  useEffect(() => {
    if (content) {
      const options = {
        keys: ["name", "subcategory"],
        threshold: 0.3,
        includeMatches: true,
      };
      const fuse = new Fuse(content, options);

      const results = fuse.search(searchTerm);
      console.log(results);
      //result will be an array of objects, each object will have the item,matches and refIndex properties.
      // the item will be the actual object from where the match came
      function findIndexByName(obj) {
        return content.findIndex((item) => item.name === obj.name);
      }

      function findIndex(obj) {
        //the obj.name// item.name or item.subcategory from fuse WILL have a match somewhere
        //so we will start by searching by name
        let index;

        let indexFromName = content.findIndex((item) => item.name === obj.name);

        let indexFromSubcategory = content.findIndex(
          (item) => item.subcategory === obj.subcategory
        );

        index = indexFromName >= 0 ? indexFromName : indexFromSubcategory;

        return index;
      }
      //this will create an array with the options that will go onto the options props of Select
      const objArr = results.map((result) => {
        return {
          value: `card-${findIndexByName(result.item)}`,
          label: result.item.name,
        };
      });
      setSearchResults(objArr);
      //searchResults  is what will go onto the options props of Select
    }
  }, [content, searchTerm]);

  useEffect(() => {
    setContent(catalog?.helados);
  }, [catalog]);

  function scrollToTop() {
    var div = document.querySelector("#shop .content");
    div.scrollTop = 0;
  }

  function handleReset() {
    setSelectedProduct(null); // or [] for multi-select
  }

  return (
    <div id="shop">
      <div>
        <Botonera
          scrollToTop={scrollToTop}
          setContent={setContent}
          content={content}
          catalog={catalog}
        />
        {content ? (
          <div
            id="searchbox"
            onTransitionEnd={(e) => {
              if (e.target === document.getElementById("searchbox")) {
                handleReset();
              }
            }}
          >
            <Select
              ref={searchboxSelectRef}
              options={searchResults}
              noOptionsMessage={() => `No hay resultados`}
              onChange={setSelectedProduct}
              onInputChange={setSearchTerm}
              placeholder={`Buscar en ${currentCategoryName}`}
              value={selectedProduct}
            />
            <div
              tabIndex="0"
              className="img-container"
              onClick={() => {
                searchboxSelectRef.current.focus();
              }}
            >
              <img src="/img/magnifier.svg" />
            </div>
          </div>
        ) : null}
      </div>
      {/* show icecream form over content cards*/}
      {iceCreamForm?.render ? (
        <FormularioHelados
          flavours={flavours}
          iceCreamForm={iceCreamForm}
          setIceCreamForm={setIceCreamForm}
          addIceCream={addIceCream}
        />
      ) : null}

      <div className="content">
        {content === null && catalog ? (
          <img class="comming-soon" src="/img/comming-soon.jpg" />
        ) : null}

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
              key={`${index}-card`}
              index={`${index}`}
              product={product}
              //this props changes every time it gets used
              addCartItem={addCartItem}
              setIceCreamForm={setIceCreamForm}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

//this rerenders every time the addCartItem function gets called
function Card({ product, addCartItem, setIceCreamForm, index }) {
  const [active, setActive] = useState(false);
  const [hash, setHash] = useHash(null);
  return (
    <div
      className="card"
      id={`card-${index}`}
      style={{ opacity: product.outOfStock ? 0.5 : 1 }}
    >
      <div className="img-container">
        {/*   <div className="points">
          <img src="/img/seal.svg" />
          <div className="text">
            <p className="points-value">{(product.price * 5) / 100}</p>
            <p className="points-string">Puntos</p>
          </div>
        </div> */}
        <img src={product.imgUrl} alt="" loading="lazy" />
      </div>
      <div className="product-description">
        <p className="product-name">{product.name}</p>
        <p className="product-price">$ {product.price}</p>
      </div>

      {product.flavours ? (
        <button
          className={`to-cart `}
          onClick={() => {
            setHash("#formulario-helados");
            setIceCreamForm((prev) => ({
              ...prev,
              product: product,
              render: true,
            }));
          }}
        >
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
          <span>Aniadir</span>
          <img style={{ filter: "invert(1)" }} src="/img/to-cart.svg" />
        </button>
      )}
    </div>
  );
}
