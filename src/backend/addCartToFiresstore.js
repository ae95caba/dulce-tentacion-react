import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebase";

export async function addCartToFirestore(
  cartItems,
  totalPrice,
  method,
  totalPoints,
  id,
  deliveryDetails = null
) {
  //setDoc needs a third parameter, whereas addDoc not: doc(db, path))
  /*   const docRef = doc(db, `users/${auth.currentUser.uid}/compras`, "compra3");
  await setDoc(docRef, { name: cartItems }); */
  const collectionRef = doc(db, `users/${auth.currentUser.uid}/compras`, id);

  await setDoc(collectionRef, {
    cartItems: cartItems,
    date: new Date(),
    completed: false,

    orderFulfillment: method,
    totalPrice: totalPrice,
    totalPoints: totalPoints,
    docId: id,
    deliveryDetails: deliveryDetails,
  });
}
