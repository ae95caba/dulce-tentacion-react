import { addDoc, collection } from "firebase/firestore";
import { auth } from "./firebase";
import { db } from "./firebase";

export async function addCartToFirestore(cartItems, totalPrice, totalPoints) {
  console.log(db);
  //setDoc needs a third parameter, whereas addDoc not: doc(db, path))
  /*   const docRef = doc(db, `users/${auth.currentUser.uid}/compras`, "compra3");
  await setDoc(docRef, { name: cartItems }); */
  const collectionRef = collection(db, `users/${auth.currentUser.uid}/compras`);
  await addDoc(collectionRef, {
    cartItems: cartItems,
    date: new Date(),
    completed: false,
    totalPrice: totalPrice,
    totalPoints: totalPoints,
  });
}
