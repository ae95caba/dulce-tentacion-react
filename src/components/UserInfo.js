import { auth } from "../backend/firebase";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { getPoints } from "../backend/getPoints";

export const UserInfo = (props) => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        //this can be one of 2
        //if user online and has bought : details obj

        //if user online and hasnt bought : {}
        let details = await getPoints();
        console.log(typeof details);
        console.log(details);
        //fix for accounts without points setted
        if (typeof details === "object") {
          details = 0;
        }
        setPoints(details);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <div id="user-info">
      <p>
        Estas <span id="conected">conectado</span>
      </p>
      <img
        referrerPolicy="no-referrer"
        src={props.userData.img ? props.userData.img : "/img/anonymous.svg"}
        alt=""
      />
      <div className="welcome">
        <p>Bienvenido </p>
        <p>
          {!props.userData.name ? props.userData.email : props.userData.name}
        </p>
      </div>
      <p>
        Tenes <span className="user-points">{points}</span> puntos
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
