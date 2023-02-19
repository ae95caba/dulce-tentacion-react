import { SignUp } from "./SignUp";
import { LogIn } from "./LogIn";
import { GoogleAuth } from "./GoogleAuth";

export function SignUpLogIn() {
  return (
    <div id="sign-up-log-in">
      <SignUp />
      <GoogleAuth />
      <LogIn />

      <button
        className="close"
        onClick={() => {
          document.getElementById("sign-up-log-in").style.display = "none";
        }}
      >
        Cerrar
      </button>
    </div>
  );
}
