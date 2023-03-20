import { auth } from "../backend/firebase";
import { signOut } from "firebase/auth";

export const UserInfo = (props) => {
  return (
    <div id="user-info">
      <p>
        Estas <span id="conected">conectado</span>
      </p>
      <img
        referrerPolicy="no-referrer"
        src={
          props.userData.img
            ? props.userData.img
            : "https://picsum.photos/id/1025/600/400"
        }
        alt=""
      />
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
