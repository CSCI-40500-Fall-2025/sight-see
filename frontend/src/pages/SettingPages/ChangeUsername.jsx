import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserNameInput, Button, Navbar } from "../../components";

export default function ChangeUsername() {
   const [newUsername, updateNewUsernameState] = useState("");

   const navigate = useNavigate();

   const changeUsernameClicked = () => {
      {
         // send username to server
      }

      let success = true;

      if (success) {
         navigate(-1);
      }
   };

   return (
      <div>
         <Navbar></Navbar>
         <h3>Change Your Username</h3>
         <UserNameInput></UserNameInput>
         <br />
         <Button title="Change Username" func={changeUsernameClicked}></Button>
      </div>
   );
}
