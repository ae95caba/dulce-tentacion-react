import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../backend/firebase";
import { collection } from "firebase/firestore";
import { auth } from "../backend/firebase";
import { format } from "date-fns";
export const UserShopping = () => {
  const query = collection(db, `users/${auth.currentUser.uid}/compras`);
  const [docs, loading, error] = useCollectionData(query);
  console.log(docs);
  console.log(query);
  return (
    <div id="purchase-list-container">
      <div id="purchase-list">
        {loading && "Cargando ..."}
        {docs?.map((doc) => {
          const dateObj = doc.date.toDate();

          // Get the date in the format DD/MM/YYYY
          const date = format(dateObj, "dd/MM/yyyy");

          // Get the time in the format HH:MM
          const hour = format(dateObj, "HH:mm");
          return (
            <div className="purchase">
              <div className="time">
                <span>{date} :</span> <span>{hour}</span>
              </div>

              {doc.cartItems?.map((item) => {
                return (
                  <div className="cart-item">
                    <img src={item.imgUrl} alt={item.name} />
                    <div className="right">
                      <p>{item.name}</p>
                      <p>{item.totalPrice}</p>
                      <div className="quantity">unidades: {item.count} </div>
                    </div>
                  </div>
                );
              })}

              <div className="description">
                <div className="description-total-price">
                  Total: ${doc.totalPrice}
                </div>
                <div className="description-total-points">Puntos : 1000</div>
                <div className="purchase-state">
                  {doc.completed === true ? "PAGADO" : "NO PAGADO"}
                </div>
              </div>
              <button
                onClick={() => {
                  const docRef = doc(
                    db,
                    `users/${auth.currentUser.uid}/compras`,
                    ""
                  );
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
