import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Navbar } from "../components";

export default function UserSettings() {
   const navigate = useNavigate();

   const navUsername = () => {
      navigate("/settings/changeUsername");
   };

   const navProfilePic = () => {
      navigate("/settings/changeProfilePicture");
   };

   const navEmail = () => {
      navigate("/settings/changeEmail");
   };

   const navPassword = () => {
      navigate("/settings/changePassword");
   };

   const logOut = () => {
      {
         /** Code to log out here */
      }
      navigate("/");
   };
   return (
      <div>
         <Navbar />
         <h1>Settings Page</h1>

         <Button title="Change Your Username" func={navUsername}></Button>
         <Button
            title="Change Your Profile Picture"
            func={navProfilePic}
         ></Button>
         <Button title="Change Your Password" func={navPassword}></Button>
         <Button title="Change Your Email" func={navEmail}></Button>
         <Button title="Log Out" func={logOut}></Button>
      </div>
   );
}
