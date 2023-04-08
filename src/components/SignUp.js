import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../backend/firebase";

import { GoogleAuth } from "./GoogleAuth";

import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function SignUp(props) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="signup-section">
      <div className="header">No tenes cuenta ?</div>
      <div className="body">
        <p
          className="dropdown-button"
          onClick={() => {
            showForm ? setShowForm(false) : setShowForm(true);
          }}
        >
          Crear cuenta <img src="/img/arrow-down.svg" />
        </p>
        {showForm ? (
          <SignUpForm
            setUserData={props.setUserData}
            userData={props.userData}
            setOfflineFilter={props.setOfflineFilter}
          />
        ) : null}
        <p className="or">- o -</p>
        <GoogleAuth text={"Entra con Google"} />
      </div>
    </div>
  );
}

function SignUpForm(props) {
  const [photo, setPhoto] = useState(null);

  //storage
  async function uploadImg(file, currentUser, setLoading) {
    const fileRef = ref(storage, `${currentUser.uid}/profilePic.png`);
    /*  setLoading(true); */
    await uploadBytes(fileRef, file);
    /*  setLoading(false); */
    const photoURL = await getDownloadURL(fileRef);

    return photoURL;
  }

  return (
    <form
      id="sign-up"
      action=""
      onSubmit={async (e) => {
        e.preventDefault();
        const email = document.getElementById("sign-up-email").value;
        const password = document.getElementById("sign-up-password").value;
        const fullName = document.getElementById("sign-up-name").value;
        try {
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          if (!photo) {
            //onAuthState listener detects user online
            //here runs a re-render due to 2  updates to the state (isUserOnline and userData)
            //showing the profile with the email instead of name
            await updateProfile(user, {
              displayName: fullName,
            });
            //this will update the user state, its async, so no re-renders
            //when it finishes  we get to see the name
            props.setUserData({
              ...props.userData,
              name: user.displayName,
              //add this incase there was a previous user signed in with a photo
              img: null,
            });
          } else {
            const photoURL = await uploadImg(photo, auth.currentUser);
            await updateProfile(user, {
              displayName: fullName,
              photoURL: photoURL,
            });
            props.setUserData({
              ...props.userData,
              name: user.displayName,
              img: user.photoURL,
            });
          }
        } catch (error) {
          console.log(error.message);
        }
      }}
    >
      <fieldset>
        <ImageSection photo={photo} setPhoto={setPhoto} />
        <div className="name-section">
          <label htmlFor="sign-up-name">Nombre completo *</label>
          <div className="input-container">
            <img src="/img/user.svg" alt="icon" />
            <input
              type="name"
              id="sign-up-name"
              placeholder="Nombre y Apellido"
              required
            />
          </div>
        </div>
        <div className="email-section">
          <label htmlFor="sign-up-email">Email *</label>
          <div className="input-container">
            <img src="/img/email.svg" alt="icon" />
            <input
              type="email"
              id="sign-up-email"
              placeholder="ejemplo@gmail.com"
              required
            />
          </div>
        </div>
        <div className="password-section">
          <label htmlFor="sign-up-password">Contrasenia *</label>
          <div className="input-container">
            <img src="/img/password.svg" alt="icon" />
            <input type="password" id="sign-up-password" required />
          </div>
        </div>
      </fieldset>

      <button type="submit">Aceptar</button>
    </form>
  );
}

function ImageSection(props) {
  const [previewSource, setPreviewSource] = useState("/img/anonymous.svg");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const fileType = file.type;
    if (file) {
      if (!fileType.startsWith("image/")) {
        alert("Elige una imagen valida");
        e.target.value = "";
      } else {
        if (file.size > 2097152) {
          alert("El archivo es muy pesado, el maximo es 2MB");
          e.target.value = "";
        } else {
          previewFile(file);
          props.setPhoto(file);
        }
      }
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <div className="img-section">
      <div className="tittle"> Foto de perfil (OPCIONAL)</div>

      <div className="img-content">
        <img src={previewSource} alt="Preview" />
        <label htmlFor="sign-up-img">
          <img src="/img/camera.svg" />
          <input
            type="file"
            id="sign-up-img"
            accept="image/*"
            onChange={(e) => {
              handleFileInputChange(e);
            }}
          />
        </label>
      </div>
    </div>
  );
}
