import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { utcToZonedTime, format } from "date-fns-tz";
import { NavLink } from "react-router-dom";

export function Home() {
  return (
    <div id="home">
      <StoreStatus />
      <div className="content">
        <div className="carousel-container">
          <Carousel
            showArrows={false}
            emulateTouch={true}
            autoPlay={true}
            interval={3000}
            stopOnHover={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            swipeScrollTolerance={80}
            preventMovementUntilSwipeScrollTolerance={true}
          >
            <div className="slider first">
              <img src="/img/carousel/netflix.jpg" loading="lazy" />
            </div>
            <div className="slider second">
              <img src="/img/carousel/family.jpg" loading="lazy" />
            </div>
            <div className="slider third">
              <img src="/img/carousel/delivery.jpg" loading="lazy" />
            </div>
            <div className="slider fourth">
              <img src="/img/carousel/doge.jpg" loading="lazy" />
            </div>
          </Carousel>
        </div>
        <Contact />
        <div className="carousel-container">
          <Carousel
            showArrows={false}
            emulateTouch={true}
            autoPlay={true}
            interval={4000}
            stopOnHover={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            swipeScrollTolerance={80}
            preventMovementUntilSwipeScrollTolerance={true}
          >
            <div className="slider first">
              <img src="/img/carousel/gracias.jpg" loading="lazy" />
            </div>
            <div className="slider second">
              <img src="/img/carousel/ofertas.jpg" loading="lazy" />
            </div>
          </Carousel>
        </div>
        <Location />
        {/*  <Schedules /> */}
        <Footer />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div id="footer">
      <div className="working-hours">
        <div>Lunes a Viernes de 19 a 24</div>
        <div>Sabados y Domingos de 12 a 24</div>
      </div>
      <div className="copyright">Copyright © 2023</div>
    </div>
  );
}

function Contact() {
  return (
    <div id="contact">
      <div className="tittle">Enfriamos tu paladar y calentamos tu corazon</div>
      <div className="body">
        <p>
          No podes comprar la felicidad pero si podes comprar helado, lo que es
          casi lo mismo !
        </p>
        <div className="button-container">
          <NavLink to="/tienda">
            <button className="call-to-action">
              <img src="/img/to-cart.svg" />
              <span>Pedi ahora!</span>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

function StoreStatus() {
  function isArgentinaEvening() {
    const argentinaTimezone = "America/Argentina/Buenos_Aires";
    const now = new Date();
    const nowInArgentina = utcToZonedTime(now, argentinaTimezone);
    const formattedTime = format(nowInArgentina, "HH:mm:ss", {
      timeZone: argentinaTimezone,
    });
    console.log(formattedTime >= "19:00:00" && formattedTime <= "23:59:59");

    return formattedTime >= "19:00:00" && formattedTime <= "23:59:59";
  }
  return (
    <div id="store-status">
      {isArgentinaEvening() ? (
        <span className="neon-green">Abierto AHORA</span>
      ) : (
        <p>
          <span> Cerrado ahora</span>, horarios abajo
        </p>
      )}
    </div>
  );
}

function Location() {
  const [showMap, setShowMap] = useState(false);
  return (
    <div id="location">
      <div style={{ display: showMap ? "none" : "grid" }} className="tittle">
        Visitanos
      </div>
      <div style={{ display: showMap ? "none" : "grid" }} className="body">
        <p>
          Somos un emprendimiento familiar, nos esforzamos por dar un servicio
          de calidad por lo que usamos helado artesanal de la mejor calidad
        </p>
        <div className="button-container">
          <button
            id="show-map"
            className="call-to-action"
            onClick={() => setShowMap(true)}
          >
            <img id="map-icon" src="/img/social/maps.png" />
            <span>Ver ubicacion</span>
          </button>
        </div>
      </div>

      {showMap ? <MapComponent /> : null}
    </div>
  );
}

function MapComponent() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const iframe = document.querySelector("iframe");

    iframe.addEventListener("load", () => {
      setIsLoaded(true);
    });
  }, []);

  return (
    <div className="map-container">
      {!isLoaded && (
        <div className="loading-container">
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
        </div>
      )}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3278.210079743154!2d-58.80161008650818!3d-34.7503004653374!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcebf7cde1c5f3%3A0x791060e1141fdd58!2sHelados%20y%20Kiosko%20Rayito!5e0!3m2!1ses-419!2sar!4v1679477719725!5m2!1ses-419!2sar"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        id="google-maps"
        title="google maps"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

function Schedules() {
  return (
    <div id="schedules">
      <div className="tittle">Horarios</div>
      <div className="body">
        <p>Lunes a Viernes de 19 a 24</p>
        <p>Sabados y Domindos de 12 a 24</p>
        <p>Feriados de 12 a 24</p>
      </div>
    </div>
  );
}
