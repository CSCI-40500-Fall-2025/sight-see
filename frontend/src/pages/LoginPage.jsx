import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

{
   /** Login Text Input component
    * Props:
    *    id:         which of (username, password) input is
    *    title:      The label for the text input
    *    type:       type for input tag (mainly for password input box, to hid characters)
    *    value:      which state variable the input box is binded to
    *    func:       function to update respective state variable on change
    */
}
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

{
   /** Login Button Component
    * Props:
    *    title:      text on button
    *    func:       function that occurs on button click
    */
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
