export function ThanksMessage(props) {
  return (
    <div id="thanks-message-container">
      <div id="thanks-message">
        <p>Muchas gracias por su compra</p>
        <p>Para terminar: </p>
        <ol>
          <li>1-Anda al local o manda un whatsapp</li>
          <li>2-Deciles que compraste por la pag</li>
          <li>3-Paga</li>
        </ol>
        <button>Ver detalle</button>
        <button onClick={() => props.close()}>cerrar</button>
      </div>
    </div>
  );
}
