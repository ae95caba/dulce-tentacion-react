import { useState, useEffect } from "react";
import { Botonera } from "./botonera";

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
      imgUrl: "https://picsum.photos/id/1025/400/400",
      price: 1200,
    },
    {
      name: "1/2kg",
      imgUrl: "https://picsum.photos/id/1025/400/400",
      price: 800,
    },
  ];
  const bebidas = [{}, {}];

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
      case "Bebidas":
        setContent(bebidas);
        break;
      case "Helados":
        setContent(helados);
        break;
      default:
    }
  }, [currentFilter]);

  return (
    <div id="shop">
      <Botonera changeContent={changeContent} currentFilter={currentFilter} />
      <div>{/*  <h1>{currentFilter}</h1> */}</div>
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
