import { Link } from "react-router-dom";

export function ThanksMessage(props) {
  return (
    <div className="message-container">
      <div className="message purchase">
        <div className="text">Pasos a seguir:</div>
        <ol>
          <li>Anda al local</li>
          <li>Deciles que compraste por la pag</li>
          <li>Paga !</li>
        </ol>
        <div className="buttons-section">
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
