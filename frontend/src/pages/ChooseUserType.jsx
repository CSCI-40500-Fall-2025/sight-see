import { useNavigate } from "react-router-dom";

{
   /** Button to choose user type
    * Props:
    *    text:    Text shown on button
    *    func:    Which function to call when button is pressed
    */
}
function ChooseUserTypeButton(props) {
   return (
      <div>
         <button onClick={props.func}>{props.text}</button>
      </div>
   );
}

export default function ChooseUserTypePage() {
   let navigate = useNavigate();
   const loginPageRoute = () => {
      navigate("/login");
   };
   const signUpPageRoute = () => {
      navigate("/signup");
   };

   return (
      <div>
         {/* Logo would be a component defined somewhere else, since it would be resued a lot?? */}
         <div>
            <h1>Sight See</h1>
         </div>

         <ChooseUserTypeButton
            text="Existing User"
            func={loginPageRoute}
         ></ChooseUserTypeButton>

         <ChooseUserTypeButton
            text="New User"
            func={signUpPageRoute}
         ></ChooseUserTypeButton>
      </div>
   );
}
