import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Image from "./Image";
export function Home() {
  return (
    <>
      <div className="content">
        <img className="right" src="/wave.png" />
        <Carousel1 />
        <h3>#LA viborita as</h3>
        <Carousel2 />
        <h3>#Promos</h3>
        <Carousel3 />
        <img className="left" src="/wave2.png" />
      </div>
    </>
  );
}

function Carousel1() {
  return (
    <div className="first carousel">
      <div className="logos-slide">
        <span className="img"> Helado Artesanal de la mejor calidad</span>
        {<span className="img">Aceptamos Mercado Pago</span>}
        <span className="img">Delivery Sin Cargo por la zona</span>
      </div>
      <div className="logos-slide">
        <span className="img"> Helado Artesanal de la mejor calidad</span>
        {<span className="img">Aceptamos Mercado Pago</span>}
        <span className="img">Delivery Sin Cargo por la zona</span>
      </div>
    </div>
  );
}

function Carousel2() {
  const urls = [
    "/img/carousel/netflix.jpg",
    "/img/carousel/family.jpg",
    "/img/carousel/delivery.jpg",
    "/img/carousel/doge.jpg",
  ];
  return (
    <div className="second carousel">
      <div className="logos-slide">
        {urls.map((url) => (
          <Image url={url} />
        ))}
      </div>
      <div className="logos-slide">
        {urls.map((url) => (
          <Image url={url} />
        ))}
      </div>
    </div>
  );
}

function Carousel3() {
  const urls = ["/img/carousel/gracias.jpg", "/img/carousel/ofertas.jpg"];
  return (
    <div className="third carousel">
      <div className="logos-slide">
        {urls.map((url) => (
          <Image url={url} />
        ))}
      </div>
      <div className="logos-slide">
        {urls.map((url) => (
          <Image url={url} />
        ))}
      </div>
    </div>
  );
}
