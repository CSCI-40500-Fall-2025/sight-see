import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Navbar } from "../../components";

export default function ChangeProfilePicture() {
   const navigate = useNavigate();
   const takingPicture = () => {
      {
         /** Take a picture here? */
         /** Store the picture */
         /** Send to server */
         /** If success is good, inform user */
         let success = true;
         if (success) {
            navigate(-1);
         }
      }
   };
   return (
      <div>
         <Navbar></Navbar>
         <h3>Change Your Profile Picture</h3>
         <Button title="Take a Picture" func={takingPicture}></Button>
      </div>
   );
}
