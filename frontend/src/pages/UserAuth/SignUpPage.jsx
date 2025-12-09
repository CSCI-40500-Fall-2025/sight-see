import { useNavigate } from "react-router-dom";
import {
   EmailInput,
   UserNameInput,
   PasswordInput,
   Button,
} from "../../components";
import { useState } from "react";
import api from "../../axiosConfig";

// TODO: Passwords should match
const SignUpFieldset = (props) => {
   return (
      <div className="w-full max-w-md px-4">
         <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <legend className="fieldset-legend text-4xl font-bold">
               Sign Up
            </legend>
            <EmailInput value={props.email} onChange={props.onEmailChange} />
            <UserNameInput
               value={props.username}
               onChange={props.onUsernameChange}
            />
            <PasswordInput
               value={props.password}
               onChange={props.onPasswordChange}
            />
            <PasswordInput
               placeholder="Confirm Password"
               value={props.confirmPassword}
               onChange={props.onConfirmPasswordChange}
            />
            <Button
               title="Sign Up"
               func={props.signUpButtonClicked}
               className="mb-2 w-full btn-neutral"
            ></Button>
            <Button
               title="Go Back"
               func={props.onGoBack}
               className="mb-2 w-full btn-soft"
            ></Button>
         </fieldset>
      </div>
   );
};

export default function SignUpPage() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [username, setUsername] = useState("");

   console.log(password);

   let navigate = useNavigate();

   const onGoBack = () => {
      navigate("/");
   };

   /* Logic for when authentication is good. Empty for now */
   const onSuccessfulSignUp = (userId) => {
      // Store the user id
      localStorage.setItem("userId", userId);
      navigate("/main");
   };

   /* Sign up button click logic. Empty for now */
   const signUpButtonClicked = async () => {
      // If password and confirmPassword don't match return
      if (password !== confirmPassword) {
         console.log("Passwords don't match");
         return;
      }

      try {
         const response = await api.post("/users", {
            username: username,
            email: email,
            password: password,
            name: "John Doe", // Dummy name
         });

         if (response.status === 201) {
            console.log("Created!");
            console.log(response.data);
            onSuccessfulSignUp();
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="flex items-center justify-center min-h-screen bg-base-100">
         <SignUpFieldset
            email={email}
            onEmailChange={setEmail}
            password={password}
            onPasswordChange={setPassword}
            confirmPassword={confirmPassword}
            onConfirmPasswordChange={setConfirmPassword}
            username={username}
            onUsernameChange={setUsername}
            onGoBack={onGoBack}
            signUpButtonClicked={signUpButtonClicked}
         />
      </div>
   );
}
