import { useNavigate } from "react-router-dom";
import { use, useState } from "react";

{
   /** SignUp Text Input component
    * Props:
    *    id:         which of (username, password, email) input is
    *    title:      The label for the text input
    *    type:       type for input tag (mainly for password input box, to hid characters)
    *    value:      which state variable the input box is binded to
    *    func:       function to update respective state variable on change
    */
}
function SignUpTextInput(props) {
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
   /** SignUp Button
    * Props:
    *    title:      text on button
    *    func:       function that occurs on button click
    */
}
function SignUpPageButton(props) {
   return (
      <div>
         <button onClick={props.func}>{props.title}</button>
      </div>
   );
}

export default function SignUpPage() {
   const navigate = useNavigate();
   const [email, updateEmailState] = useState("");
   const [username, updateUsernameState] = useState("");
   const [password, updatePassWordState] = useState("");

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
            type="text"
            value={email}
            func={updateEmailState}
         ></SignUpTextInput>
         <SignUpTextInput
            title="Username"
            id="SignUpPageUsernameField"
            type="text"
            value={username}
            func={updateUsernameState}
         ></SignUpTextInput>
         <SignUpTextInput
            title="Password"
            id="SignUpPagePasswordField"
            type="password"
            value={password}
            func={updatePassWordState}
         ></SignUpTextInput>

         <SignUpPageButton
            title="Sign Up!"
            func={signUpButtonClicked}
         ></SignUpPageButton>
      </div>
   );
}
