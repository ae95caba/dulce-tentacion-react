import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "./firebase";

export function addLastDeliveryDetails(deliveryDetails) {
  const docRef = doc(db, "users", `${auth.currentUser.uid}`);
  const data = { deliveryDetails };
  updateDoc(docRef, data);
}
