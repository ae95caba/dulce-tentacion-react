import React from "react";

const reviewsArr = [
  {
    message: `Exelente servicio muy ricos helados,
    Muy buena atención gracias ✨👏👏`,
    author: "Karina Bianchi",
    dateString: "Hace un año",
    avatar: "/img/reviews/1.png",
  },
  {
    message: `Helados super deliciosos. Recomendable. Buen precio. Buena atención.`,
    author: "Paula Galafassi",
    dateString: "Hace un año",
    avatar: "/img/reviews/2.png",
  },
  {
    message: `Son muy ricos helados. Súper recomendables. Buena atención. Buen precio`,
    author: "Nelida Torres",
    dateString: "Hace un año",
    avatar: "/img/reviews/3.png",
  },
  {
    message: `Buenisima atencion..
    Riquisimo los🍧`,
    author: "Maria Acosta",
    dateString: "Hace un año",
    avatar: "/img/reviews/4.png",
  },
];

export default function Reviews() {
  return (
    <>
      <div className="container">
        <h1>Testimonios</h1>
        <p className="description">
          Nuestros clientes han disfrutrado nuestro producto yquieren compartir
          sus experiencias con vos.
        </p>
      </div>
      <div className="container">
        {reviewsArr.map((review) => (
          <Review review={review} />
        ))}
      </div>
    </>
  );
}

function Review({ review }) {
  return (
    <div className="review">
      <p>"{review.message}"</p>
      <section>
        <img src={review.avatar} alt="avatar" srcset="" />
        <div className="sub-container">
          <h4>{review.author}</h4>
          <p>{review.dateString}</p>
        </div>
        <img
          className="quotes"
          src="/img/reviews/quotes.png"
          alt="as"
          srcset=""
        />
      </section>
    </div>
  );
}
