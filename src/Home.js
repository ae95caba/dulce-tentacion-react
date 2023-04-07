import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export function Home() {
  return (
    <div id="home">
      <div className="content">
        <Header />
        <Contact />
        <Schedules />
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div id="contact">
      <div className="tittle">Contacto</div>
      <div className="content">
        <button id="whatsapp">
          <img src="/img/social/whatsapp.svg" />
          Whatsapp: 1127191588
        </button>

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
    </div>
  );
}

function Schedules() {
  return (
    <div id="schedules">
      <div className="tittle">Horarios</div>
      <div className="content">
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
      <div className="tittle">Bienvenido</div>
      <Carousel
        showArrows={false}
        autoPlay={true}
        stopOnHover={false}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
      >
        <div className="slider first">
          <p>Usa tus puntos para comprar en la tienda !</p>
        </div>
        <div className="slider second">
          <p>Con cada producto que compres obtendras puntos !</p>
        </div>
        <div className="slider third">
          <p>Cuando tengas suficientes podras usarlos para comprar !</p>
        </div>
        <div className="slider fourth">
          <p>Cada producto tiene un precio en pesos y otro en puntos</p>
        </div>
        <div className="slider fourth">
          <p>Podes ver cuantos puntos tenes ingresando a tu perfil</p>
        </div>
      </Carousel>
    </div>
  );
}
