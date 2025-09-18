import { useNavigate } from "react-router-dom";

function LoginTextInput(props) {
   return (
      <div>
         <label id={props.id}>
            {props.title}:
            <br />
            <input type="text" />
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
   let navigate = useNavigate();

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
            id="LoginPageUsernameField"
         ></LoginTextInput>
         
         <LoginTextInput
            title="Password"
            id="LoginPagePasswordField"
            type="password"
         ></LoginTextInput>

         <LoginPageButton
            title="Login!"
            func={loginButtonClicked}
         ></LoginPageButton>
         {/* TODO: Add way to reset password*/}
      </div>
   );
}
