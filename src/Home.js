import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { utcToZonedTime, format } from "date-fns-tz";

export function Home() {
  return (
    <div id="home">
      <StoreStatus />
      <div className="content">
        <Header />
        <Contact />
        <Location />
        <Schedules />
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div id="contact">
      <div className="tittle">Contacto</div>
      <div className="body">
        <div className="button-container">
          <button id="whatsapp">
            <img src="/img/social/whatsapp.svg" />
            Whatsapp{/* : 1127191588 */}
          </button>
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
        <span style={{ color: "green" }}>Abierto AHORA</span>
      ) : (
        <span>Cerrado, horarios abajo</span>
      )}
    </div>
  );
}

function Location() {
  return (
    <div id="location">
      <div className="tittle">Ubicacion</div>
      <MapComponent />
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

function Header() {
  return (
    <div id="header">
      {/* <StoreStatus /> */}
      <div className="tittle">Bienvenido</div>
      <Carousel
        showArrows={false}
        autoPlay={true}
        stopOnHover={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        swipeScrollTolerance={20}
        preventMovementUntilSwipeScrollTolerance={true}
      >
        <div className="slider first">
          <p>Compra y consegui puntos !</p>
        </div>
        <div className="slider second">
          <p>Proximamente podras gastarlos en cupones !</p>
        </div>
        <div className="slider third">
          <p>Habran cupones de descuento y canjes por productos !</p>
        </div>
        <div className="slider fourth">
          <p>Habran promos por dias festivos !</p>
        </div>
      </Carousel>
    </div>
  );
}
