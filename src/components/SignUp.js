import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../backend/firebase";

import { GoogleAuth } from "./GoogleAuth";

import { useState, useEffect, useRef } from "react";
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

        <GoogleAuth text={"Entra con Google"} />
      </div>
    </div>
  );
}

function SignUpForm(props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [photo, setPhoto] = useState(null);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const confirmPasswordRef = useRef(null);

  useEffect(() => {
    if (error.confirmPassword === "Las contrasenias no son iguales.") {
      confirmPasswordRef.current.setCustomValidity(
        "Las contrasenias no son iguales."
      );
    } else if (error.confirmPassword === "") {
      confirmPasswordRef.current.setCustomValidity("");
    }
  }, [error]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "Escribe tu nombre completo.";
          }
          break;

        case "email":
          if (!value) {
            stateObj[name] = "Ingresa tu email.";
          } else if (!e.target.validity.valid) {
            stateObj[name] = "El email no es valido.";
          }
          break;

        /*  case "birthday":
          if (!value) {
            stateObj[name] = "Ingresa tu fecha de nacimiento.";
          } else if (!e.target.validity.valid) {
            stateObj[name] = "La fecha no es valida.";
          }
          break; */

        case "password":
          console.log(e.target.validity.valid);
          if (!value) {
            //if empty
            stateObj[name] = "Escribe una contrasenia.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            //if not match and confirmPassword has value
            if (!e.target.validity.valid) {
              stateObj[name] =
                "Debe tener por lo menos: 8 caracteres, 1 letra y 1 numero";
            }
            stateObj["confirmPassword"] = "Las contrasenias no son iguales.";
          } else {
            //if match
            if (!e.target.validity.valid) {
              stateObj[name] =
                "Debe tener por lo menos: 8 caracteres, 1 letra y 1 numero";
            }
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Escribe una contrasenia.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Las contrasenias no son iguales.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  //storage
  async function uploadImg(file, currentUser, setLoading) {
    const fileRef = ref(storage, `users/${currentUser.uid}/profilePic`);
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
          alert(error.message);
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
              className={error.username ? "invalid" : ""}
              name="username"
              id="sign-up-name"
              placeholder="Nombre y Apellido"
              onChange={onInputChange}
              onBlur={validateInput}
              value={input.username}
              required
            />
          </div>
          {error.username && <span className="err">{error.username}</span>}
        </div>
        <div className="email-section">
          <label htmlFor="sign-up-email">Email *</label>
          <div className="input-container">
            <img src="/img/email.svg" alt="icon" />
            <input
              className={error.email ? "invalid" : ""}
              type="text"
              id="sign-up-email"
              pattern="^\S+@\S+\.\S+$"
              name="email"
              placeholder="ejemplo@gmail.com"
              onChange={onInputChange}
              onBlur={validateInput}
              value={input.email}
              required
            />
          </div>
          {error.email && <span className="err">{error.email}</span>}
        </div>
        {/* <div className="birthday-section">
          <label htmlFor="sign-up-birthday">Fecha de nacimiento *</label>
          <div className="input-container">
            <input
              className={error.birthday ? "invalid" : ""}
              name="birthday"
              type="date"
              id="sign-up-birthday"
              min="1920-01-01"
              max="2018-01-01"
              value={input.birthday}
              onChange={onInputChange}
              onBlur={validateInput}
              required
            />
          </div>
          {error.birthday && <span className="err">{error.birthday}</span>}
        </div> */}
        <div className="password-section">
          <label htmlFor="sign-up-password">Contrasenia *</label>
          <div className="input-container">
            <img src="/img/password.svg" alt="icon" />
            <input
              className={error.password ? "invalid" : ""}
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              id="sign-up-password"
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
              title="Password must have at least 8 characters, 1 letter, and 1 number"
              value={input.password}
              onChange={onInputChange}
              onBlur={validateInput}
              required
            />
            <img
              className="eye"
              src={isPasswordVisible ? "/img/eye.svg" : "/img/eye-hide.svg"}
              alt="eye showing visibility"
              onClick={() => {
                setIsPasswordVisible((prev) => !prev);
              }}
            />
          </div>
          {error.password && <span className="err">{error.password}</span>}
        </div>
        <div className="password-validation-section">
          <label htmlFor="sign-up-password-validation">
            Confirmacion de contrasenia *
          </label>
          <div className="input-container">
            <img src="/img/password.svg" alt="icon" />
            <input
              className={error.confirmPassword ? "invalid" : ""}
              ref={confirmPasswordRef}
              type={isConfirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              id="sign-up-password-validation"
              onChange={onInputChange}
              value={input.confirmPassword}
              onBlur={validateInput}
              required
            />
            <img
              className="eye"
              src={
                isConfirmPasswordVisible ? "/img/eye.svg" : "/img/eye-hide.svg"
              }
              alt="eye showing visibility"
              onClick={() => {
                setIsConfirmPasswordVisible((prev) => !prev);
              }}
            />
          </div>
          {error.confirmPassword && (
            <span className="err">{error.confirmPassword}</span>
          )}
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
