import { addDoc, setDoc, collection, doc } from "firebase/firestore";
import { auth } from "./firebase";
import { db } from "./firebase";

export async function addCartToFirestore(
  cartItems,
  totalPrice,
  totalPoints,
  id
) {
  console.log(cartItems);
  console.log(totalPrice);
  console.log(totalPoints);
  console.log(id);

  //setDoc needs a third parameter, whereas addDoc not: doc(db, path))
  /*   const docRef = doc(db, `users/${auth.currentUser.uid}/compras`, "compra3");
  await setDoc(docRef, { name: cartItems }); */
  const collectionRef = doc(db, `users/${auth.currentUser.uid}/compras`, id);
  console.log(collectionRef);
  await setDoc(collectionRef, {
    cartItems: cartItems,
    date: new Date(),
    completed: false,
    totalPrice: totalPrice,
    totalPoints: totalPoints,
    docId: id,
  });
}
