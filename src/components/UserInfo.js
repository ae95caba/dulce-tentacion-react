import { auth } from "../backend/firebase";
import { getAuth, signOut } from "firebase/auth";

export const UserInfo = (props) => {
  return (
    <div id="user-info">
      <p>Estas conectado</p>
      <img src={props.userData.img} alt="" />
      <p>Bienvenido </p>
      <p>{!props.userName ? props.userData.email : props.userData.name}</p>
      <p>Puntos: 1000</p>
      <button
        onClick={() => {
          signOut(auth)
            .then(() => {
              console.log("saliste perri");
            })
            .catch((error) => {
              console.log(error.message);
            });
        }}
      >
        Cerrar session
      </button>
    </div>
  );
};
