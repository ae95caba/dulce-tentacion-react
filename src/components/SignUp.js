import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../backend/firebase";

import { GoogleAuth } from "./GoogleAuth";

import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export function SignUp(props) {
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
    <div className="form-container">
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
            props.setOfflineFilter("Inicia sesion");
          } catch (error) {
            console.log(error.message);
          }

          document.getElementById("sign-up").reset();
        }}
      >
        <fieldset>
          <legend>No tenes cuenta ?</legend>

          <ImageSection photo={photo} setPhoto={setPhoto} />
          <div className="name-section">
            <label htmlFor="sign-up-name">Nombre completo:</label>
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
            <label htmlFor="sign-up-email">Email:</label>
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
            <label htmlFor="sign-up-password">Contrasenia:</label>
            <div className="input-container">
              <img src="/img/password.svg" alt="icon" />
              <input type="password" id="sign-up-password" required />
            </div>
          </div>
          <div className="buttons-section">
            <button type="submit">Crear cuenta</button>
            <p>- o -</p>
            <GoogleAuth text={"Entra con Google"} />
          </div>
        </fieldset>
      </form>
    </div>
  );
}

function ImageSection(props) {
  const [previewSource, setPreviewSource] = useState("/img/anonymous.svg");

  const handleFileInputChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      previewFile(file);
      props.setPhoto(file);
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
      <div className="tittle"> Foto de perfil:</div>

      <div className="content">
        <img src={previewSource} alt="Preview" />
        <label htmlFor="sign-up-img">
          <img src="/img/camera.svg" />
          <input
            type="file"
            id="sign-up-img"
            onChange={(e) => {
              handleFileInputChange(e);
            }}
          />
        </label>
      </div>
    </div>
  );
}
