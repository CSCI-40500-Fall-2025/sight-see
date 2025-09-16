import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function LoginTextInput(props) {
   return (
      <div>
         <label id={props.id}>
            {props.title}:
            <br />
            <input
               type={props.type}
               value={props.value}
               onChange={(e) => props.func(e.target.value)}
            />
         </label>
      </div>
   );
}

function LoginPageButton(props) {
   return (
      <div>
         <button onClick={props.func}>{props.title}</button>
      </div>
   );
}

export default function LoginPage() {
   const navigate = useNavigate();
   const [usernameInput, setUsernameInput] = useState("");
   const [passwordInput, setPasswordInput] = useState("");

   {
      /** TESSTING*/
   }
   useEffect(() => {
      console.log(`Current Username: ${usernameInput}`);
      console.log(`Current Password: ${passwordInput}`);
   }, [usernameInput, passwordInput]);

   {
      /* Logic for when authentication is good. Empty for now */
   }
   const onSuccessfulLogin = () => {
      {
         /** Store credentials here */
      }

      navigate("/main");
   };

   {
      /* Login button click logic. Empty for now */
   }
   const loginButtonClicked = () => {
      {
         /* Pre check here */
      }
      if (usernameInput.trim() === "" || passwordInput.trim() === "") {
         {
            /** Error message here, telling user to input something into the fields */
         }
         return;
      }

      {
         /** Send info to server here */
      }

      if (true) {
         onSuccessfulLogin();
      }
   };

   return (
      <div>
         <div>
            <h1>Login</h1>
         </div>

         <LoginTextInput
            title="Username"
            type="text"
            id="LoginPageUsernameField"
            value={usernameInput}
            func={setUsernameInput}
         ></LoginTextInput>

         {/* TODO: Make text for password input hidden somehow */}
         <LoginTextInput
            title="Password"
            type="password"
            id="LoginPagePasswordField"
            value={passwordInput}
            func={setPasswordInput}
         ></LoginTextInput>

         <LoginPageButton
            title="Login!"
            func={loginButtonClicked}
         ></LoginPageButton>
         {/* TODO: Add way to reset password*/}
      </div>
   );
}
