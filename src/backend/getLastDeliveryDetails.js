import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "./firebase";

export async function getLastDeliveryDetails() {
  //if user is logedin
  if (auth.currentUser) {
    const docRef = doc(db, "users", `${auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);

    // if the user already has bought something with delivery
    if (docSnap.data().deliveryDetails) {
      const lastDeliveryDetails = docSnap.data().deliveryDetails;
      return lastDeliveryDetails;
      //if the user hasnt bought anything yet
    } else {
      return {};
    }
    //if the user is offline
  } else {
    return {};
  }
}
