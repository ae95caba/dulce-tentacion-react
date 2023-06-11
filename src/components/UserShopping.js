import { useCollectionData } from "react-firebase-hooks/firestore";
import { db, auth } from "../backend/firebase";
import { collection, deleteDoc, doc as firebaseDoc } from "firebase/firestore";

import { format } from "date-fns";
import { Details } from "./Cart";
import uniqid from "uniqid";
import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";

export const UserShopping = () => {
  const [confirmMessage, setConfirmMessage] = useState({
    show: false,
    docRef: null,
  });

  const query = collection(db, `users/${auth.currentUser.uid}/compras`);
  const [docs, loading, error] = useCollectionData(query);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <div id="purchase-list-container">
      {confirmMessage.show ? (
        <ConfirmMessage
          confirmMessage={confirmMessage}
          setConfirmMessage={setConfirmMessage}
        />
      ) : null}
      <div id="purchase-list">
        {loading ? (
          /*  <div className="loading">Cargando...</div> */ <ThreeCircles
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
        ) : null}
        {!docs?.length > 0 && !loading && (
          <div id="no-purchases-message">
            No has comprado nada aun, que esperas ?
          </div>
        )}
        {docs?.reverse().map((doc) => {
          const dateObj = doc.date.toDate();

          // Get the date in the format DD/MM/YYYY
          const date = format(dateObj, "dd/MM/yyyy");

          // Get the time in the format HH:MM
          const hour = format(dateObj, "HH:mm");
          const deliveryDetailsId = uniqid();
          return (
            <div className="purchase" key={uniqid()}>
              <div className="time">
                <span>{date} :</span> <span>{hour}</span>
              </div>

              {doc.cartItems?.map((item) => {
                const detailsId = uniqid();

                return (
                  <div className="cart-item" key={uniqid()}>
                    <img src={item.imgUrl} alt={item.name} />
                    <div className="right">
                      <div className="description">
                        <p className="description-name">{item.name}</p>
                        <p className="description-price">$ {item.totalPrice}</p>
                      </div>
                      {item.flavoursArr ? (
                        <div
                          className="details-button"
                          onClick={() => {
                            console.log(item.flavoursArr);
                            const details = document.getElementById(detailsId);

                            details.style.display === "flex"
                              ? (details.style.display = "none")
                              : (details.style.display = "flex");
                          }}
                        >
                          Detalle
                        </div>
                      ) : (
                        <div className="quantity">
                          <p>unidades: {item.count}</p>
                        </div>
                      )}
                    </div>
                    {item.flavoursArr ? (
                      <Details item={item} detailsId={detailsId} />
                    ) : null}
                  </div>
                );
              })}

              <div className="description">
                <p className="description-total-price">
                  Total: ${doc.totalPrice}
                </p>

                <button className="purchase-state">
                  {doc.completed === true ? "Pagado" : "Pendiente de pago"}
                </button>
                <div className="order-fulfillment">
                  {doc.deliveryDetails ? (
                    <>
                      <p
                        className="dropdown-button"
                        onClick={() => {
                          document.getElementById(`${deliveryDetailsId}`).style
                            .display === "none"
                            ? (document.getElementById(
                                `${deliveryDetailsId}`
                              ).style.display = "flex")
                            : (document.getElementById(
                                `${deliveryDetailsId}`
                              ).style.display = "none");
                        }}
                      >
                        Delivery
                        <img src="/img/arrow-down.svg" />
                      </p>
                      <div
                        className="delivery-details"
                        id={`${deliveryDetailsId}`}
                        style={{ display: "none" }}
                      >
                        <p>Barrio: {doc.deliveryDetails.barrio}</p>
                        <p>Direccion: {doc.deliveryDetails.direccion}</p>
                        <p>Entre calles: {doc.deliveryDetails.entreCalles}</p>

                        {doc.deliveryDetails.aditionalInfo ? (
                          <p>
                            {`Informacion adicional: ${doc.deliveryDetails.aditionalInfo}`}
                          </p>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <button className="tittle pickup">
                      Retiro en el local
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  const docRef = firebaseDoc(
                    db,
                    `users/${auth.currentUser.uid}/compras`,
                    doc.docId
                  );

                  setConfirmMessage({ show: true, docRef: docRef });
                }}
              >
                Cancelar
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function ConfirmMessage(props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="message-container">
      <div className="message">
        <div className="text">Estas seguro?</div>
        <div className="buttons-section">
          <button
            onClick={() => {
              deleteDoc(props.confirmMessage.docRef);

              props.setConfirmMessage({ show: false, docRef: null });
            }}
          >
            Aceptar
          </button>
          <button
            onClick={() => {
              props.setConfirmMessage({ show: false, docRef: null });
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
