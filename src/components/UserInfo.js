import { auth } from "../backend/firebase";
import { signOut } from "firebase/auth";

export const UserInfo = (props) => {
  return (
    <div id="user-info">
      <p>
        Estas <span id="conected">conectado</span>
      </p>
      <img src={props.userData.img} alt="" />
      <div className="welcome">
        <p>Bienvenido </p>
        <p>
          {!props.userData.name ? props.userData.email : props.userData.name}
        </p>
      </div>
      <p>
        Tenes <span className="user-points">1000</span> puntos
      </p>
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
