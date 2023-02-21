import { useState, useEffect } from "react";
import { Botonera } from "./Botonera";

export function Shop(props) {
  const galletitas = [
    {
      name: "Pituzas",
      imgUrl: "https://picsum.photos/id/1025/400/400",
      price: 150,
    },
    {
      name: "Don Satur agridulces",
      imgUrl: "https://picsum.photos/id/1025/400/400",
      price: 110,
    },
  ];
  const helados = [
    {
      name: "1kg",
      imgUrl: "/img/helados/kilo.jpg",
      price: 1200,
    },
    {
      name: "1/2kg",
      imgUrl: "/img/helados.medio.jpg",
      price: 800,
    },
    {
      name: "1/4kg",
      imgUrl: "/img/helados/cuarto.jpg",
      price: 800,
    },
  ];
  const escabio = [
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
  ];

  const [currentFilter, setCurrentFilter] = useState("Helados");
  const [content, setContent] = useState(galletitas);

  function changeContent(e) {
    setCurrentFilter(e.target.innerText);
  }

  useEffect(() => {
    switch (currentFilter) {
      case "Galletitas":
        setContent(galletitas);
        break;
      case "Escabio":
        setContent(escabio);
        break;
      case "Helados":
        setContent(helados);
        break;
      default:
    }
  }, [currentFilter]);

  return (
    <div id="shop">
      <Botonera changeContent={changeContent} />

      <div className="content">
        {content.map((product) => {
          return (
            <div className="card">
              <img src={product.imgUrl} alt="" />
              <p>{product.name}</p>
              <p>${product.price}</p>
              <button
                className="to-cart"
                onClick={() => {
                  props.addCartItem(product);
                }}
              >
                Aniadir al carrito
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
