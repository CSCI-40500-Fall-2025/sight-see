import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordInput, Button, Navbar } from "../../components";

export default function ChangePassword() {
   const [oldPassword, updateOldPasswordState] = useState("");
   const [newPassword, updateNewPasswordState] = useState("");

   const navigate = useNavigate();

   const changePasswordClicked = () => {
      {
         // send passwords to server to verify
      }

      let success = true;

      if (success) {
         navigate(-1);
      }
   };

   return (
      <div>
         <Navbar></Navbar>
         <h3>Change Your Password</h3>
         <br></br>
         <h4>Enter Old Password:</h4>
         <PasswordInput></PasswordInput>
         <h4>Enter New Password:</h4>
         <PasswordInput></PasswordInput>
         <br />
         <Button title="Change Password" func={changePasswordClicked}></Button>
      </div>
   );
}
