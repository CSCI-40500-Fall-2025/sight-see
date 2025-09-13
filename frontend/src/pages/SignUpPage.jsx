import { useNavigate } from "react-router-dom";

function SignUpTextInput(props) {
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

function SignUpPageButton(props) {
   return (
      <div>
         <button onClick={props.func}>{props.title}</button>
      </div>
   );
}

export default function SignUpPage() {
   let navigate = useNavigate();

   {
      /* Logic for when authentication is good. Empty for now */
   }
   const onSuccessfulSignUp = () => {
      {
         /** Store credentials here */
      }

      navigate("/main");
   };

   {
      /* Sign up button click logic. Empty for now */
   }
   const signUpButtonClicked = () => {
      {
         /** Send info to server here */
      }

      if (true) {
         onSuccessfulSignUp();
      }
   };

   return (
      <div>
         <div className="logo">
            <h1>Sign Up</h1>
         </div>

         <SignUpTextInput
            title="Email"
            id="SignUpPageEmailField"
         ></SignUpTextInput>
         <SignUpTextInput
            title="Username"
            id="SignUpPageUsernameField"
         ></SignUpTextInput>
         {/* TODO: Make text for password input hidden somehow */}
         <SignUpTextInput
            title="Password"
            id="SignUpPagePasswordField"
         ></SignUpTextInput>

         <SignUpPageButton
            title="Sign Up!"
            func={signUpButtonClicked}
         ></SignUpPageButton>
      </div>
   );
}
