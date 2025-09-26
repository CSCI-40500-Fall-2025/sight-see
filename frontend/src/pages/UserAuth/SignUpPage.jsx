import { useNavigate } from "react-router-dom";
import { EmailInput, UserNameInput, PasswordInput, Button } from "./UserAuthComponents";

const signUpButtonClicked = () => {
   {
      /** Send info to server here */
   }

   if (true) {
      onSuccessfulSignUp();
   }
};

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
   
   const SignUpFieldset = (props) => {
      return (
         <div className="w-full max-w-md px-4">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
               <legend className="fieldset-legend text-4xl font-bold">Sign Up</legend>
               <EmailInput/>
               <UserNameInput/>
               <PasswordInput/>
               <PasswordInput placeholder="Confirm Password"/>
               <Button
                  title="Sign Up"
                  func={signUpButtonClicked}
                  className="mb-2 w-full btn-neutral"
               ></Button>
               <Button
                  title="Go Back"
                  func={() => navigate(-1)}
                  className="mb-2 w-full btn-soft"
               ></Button>
            </fieldset>
         </div>
      );
   }

   return (
      <div className="flex items-center justify-center min-h-screen bg-base-100">
         <SignUpFieldset/>
      </div>
   );
}
