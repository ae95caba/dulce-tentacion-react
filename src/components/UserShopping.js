import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../backend/firebase";
import { collection, deleteDoc } from "firebase/firestore";
import { auth } from "../backend/firebase";
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
          console.log(doc.id);
          return (
            <div className="purchase">
              <div>{doc.date.toDate().toString()}</div>
              <div>
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
              </div>
              <div>Total: {doc.totalPrice}</div>
              <div>{doc.completed === true ? "PAGADO" : "NO PAGADO"}</div>
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
