import { Link } from "react-router-dom";

export function ThanksMessage(props) {
  return (
    <div id="thanks-message-container">
      <div id="thanks-message">
        <div className="introduction">
          <p>Gracias por tu compra</p>
          <p>Para terminar: </p>
        </div>
        <ol>
          <li>1- Anda al local o manda un whatsapp</li>
          <li>2- Deciles que compraste por la pag</li>
          <li>3- Paga !</li>
        </ol>
        <div className="buttons-container">
          <button>
            <Link
              to="/perfil"
              onClick={() => {
                props.close();
                setTimeout(() => {
                  document.getElementById("compras").click();
                }, 10);
              }}
            >
              Ver detalle
            </Link>
          </button>
          <button onClick={() => props.close()}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}
