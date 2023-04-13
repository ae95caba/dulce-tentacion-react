import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "./firebase";

export function addProductsToFirestore(products) {
  const docRef = doc(db, "shop", `catalog`);
  const data = { products };
  updateDoc(docRef, data);
}
