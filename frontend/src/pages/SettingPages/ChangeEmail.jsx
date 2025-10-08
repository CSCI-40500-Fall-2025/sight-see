import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailInput, Button, Navbar } from "../../components";

export default function ChangeEmail() {
   const [newEmail, updateNewEmailState] = useState("");

   const navigate = useNavigate();

   const changeEmailClicked = () => {
      {
         // send email to server
      }

      let success = true;

      if (success) {
         navigate(-1);
      }
   };

   return (
      <div>
         <Navbar></Navbar>
         <h3>Change Your Email</h3>
         <EmailInput></EmailInput>
         <br />
         <Button title="Change Email" func={changeEmailClicked}></Button>
      </div>
   );
}
