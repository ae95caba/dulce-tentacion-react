import React, { useState, useEffect } from "react";
import { Botonera } from "./Botonera";
import { FormularioHelados } from "./FormularioHelados";
import uniqid from "uniqid";

export const Shop = React.memo(({ addCartItem, addIceCream }) => {
  const [catalog, setCatalog] = useState({
    helados: [
      {
        name: "1 kg",
        imgUrl: "/img/helados/kilo.jpg",
        price: 1200,

        flavours: 4,
      },
      {
        name: "1/2 kg",
        imgUrl: "/img/helados/medio.jpg",
        price: 800,

        flavours: 3,
      },
      {
        name: "1/4 kg",
        imgUrl: "/img/helados/cuarto.jpg",
        price: 800,

        flavours: 2,
      },
    ],
    escabio: [
      { name: "Speed", imgUrl: "/img/escabio/speed.jpg", price: 400 },
      {
        name: "Frizze blue",
        imgUrl: "/img/escabio/frizze-blue.jpg",
        price: 1200,
      },
      {
        name: "Skyy durazno",
        imgUrl: "/img/escabio/skyy-durazno.jpg",
        price: 1200,
      },
      {
        name: "Latas Brahma",
        imgUrl: "/img/escabio/latas-brahma.jpg",
        price: 1200,
      },
      {
        name: "Smirnoff",
        imgUrl: "/img/escabio/smirnoff.png",
        price: 1200,
      },
      {
        name: "Dr. Lemon",
        imgUrl: "/img/escabio/dr-lemon.jpg",
        price: 1200,
      },
      {
        name: "Baggio",
        imgUrl: "/img/escabio/baggio.jpg",
        price: 1200,
      },
      {
        name: "Cafe al coñac",
        imgUrl: "/img/escabio/cafe-al-coñac.png",
        price: 1200,
      },
      {
        name: "Budweiser 750ml",
        imgUrl: "/img/escabio/budweiser-750.png",
        price: 1200,
      },
      {
        name: "Whisky criadores",
        imgUrl: "/img/escabio/whisky-criadores.jpg",
        price: 1200,
      },
      {
        name: "Vino Santa Filomena",
        imgUrl: "/img/escabio/vino-santa-filomena.jpg",
        price: 1200,
      },
      {
        name: "Porron Miller",
        imgUrl: "/img/escabio/porron-miller.jpg",
        price: 1200,
      },
      {
        name: "Iguana 1L",
        imgUrl: "/img/escabio/iguana-1l.jpg",
        price: 1200,
      },
      {
        name: "Vino Michel Torino rojo",
        imgUrl: "/img/escabio/vino-michel-torino-rojo.jpg",
        price: 1200,
      },
    ],
  });

  //content is what will be mapped
  const [content, setContent] = useState(catalog.helados);
  //iceCreamForm content
  //{show: true,product: product,}
  const [iceCreamForm, setIceCreamForm] = useState({
    show: false,

    product: undefined,
  });
  const [cards, setCards] = useState();

  useEffect(() => {
    setCards(
      content.map((product) => (
        <Card
          product={product}
          addCartItem={addCartItem}
          addIceCream={addIceCream}
          openIceCreamForm={openIceCreamForm}
        />
      ))
    );
  }, [content, addCartItem]);

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
      <Botonera setContent={setContent} catalog={catalog} />
      {iceCreamForm.show ? (
        <FormularioHelados
          product={iceCreamForm.product}
          close={closeIceCreamForm}
          addIceCream={addIceCream}
        />
      ) : null}

      <div className="content">{cards}</div>
    </div>
  );
});

function Card({ product, addCartItem, openIceCreamForm }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    return setActive(false);
  }, []);
  return (
    <div className="card" key={uniqid()}>
      <div className="img-container">
        <div className="points">
          <img src="/img/seal.svg" />
          <div className="text">
            <p className="points-value">{(product.price * 5) / 100}</p>
            <p className="points-string">Puntos</p>
          </div>
        </div>
        <img src={product.imgUrl} alt="" />
      </div>
      <div className="product-description">
        <p className="product-name">{product.name}</p>
        <p className="product-price">$ {product.price}</p>
      </div>

      <button
        className={`to-cart ${active ? "active" : ""}`}
        onAnimationEnd={() => {
          console.log("ani end");
          setActive(false);
        }}
        onClick={
          product.flavours
            ? () => openIceCreamForm(product)
            : () => {
                addCartItem(product);
                setActive(true);
              }
        }
      >
        Aniadir al carrito
      </button>
    </div>
  );
}
