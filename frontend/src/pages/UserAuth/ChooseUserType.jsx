import { useNavigate } from "react-router-dom";
import { Button } from "../../components";

export default function ChooseUserTypePage() {
   let navigate = useNavigate();

   const ChooseUserTypeFieldset = (props) => {
      return (
         <div className="">
            <h1 className="mb-4">Sign up for Sight See</h1>
            <fieldset className="fieldset p-4">
               <Button 
                  className="mb-2 w-full btn-neutral" 
                  title="Sign Up" 
                  func={() => navigate("/signup")}
               />
               <Button 
                  className="mb-2 w-full btn-soft" 
                  title="Log In" 
                  func={() => navigate("/login")}
               /> 
            </fieldset>
         </div>
      );
   }

   return (
      // Logo would be a component defined somewhere else, since it would be reused a lot??
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100"> 
         <ChooseUserTypeFieldset />
      </div>
   );
}
