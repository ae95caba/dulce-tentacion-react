import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "./firebase";

export function setPoints(points) {
  const docRef = doc(db, "users", `${auth.currentUser.uid}`);
  const data = { points };
  updateDoc(docRef, data);
}
