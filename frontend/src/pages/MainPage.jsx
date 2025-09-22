{
   /** Very temporary
    * To DO:
    *  Find out how to use icons, to ensure everything looks to scale on different screen sizes
    *    for now, use static picture
    */
}

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import menuIcon from "../assets/menu_icon.png";
import backArrow from "../assets/back_arrow.png";

{
   /** Component for the Menu popup / sidebar
    *  Very temp
    *  Look into either making this a popup, or something that slides in from the left?
    *  Props:
    *    func:          Dismiss the menu by changing the showMenu bool in Main Page
    *                   Might be unnecessary?
    *    userId:        userID of current user, used to navigate to profile
    */
}
function Menu(props) {
   const navigate = useNavigate();

   const navToProfile = () => {
      navigate(`/profile/${props.useID}`);
   };

   const navToSettings = () => {
      navigate("/settings");
   };

   return (
      <div>
         <button onClick={() => props.func()}>
            <img src={backArrow} alt="Menu Button" />
         </button>
         <button onClick={navToProfile}>
            <h2>User Profile</h2>
         </button>
         <button onClick={navToSettings}>
            <h2>User Settings</h2>
         </button>
      </div>
   );
}

export default function MainPage() {
   const postId = "sample";
   const currestUserID = "LeafyExcitement";
   let navigate = useNavigate();
   const [showMenu, changeShowMenuState] = useState(false);

   {
      // Temporary
      // Just to get to post page
   }
   function buttonClick(postId) {
      navigate(`/post/${postId}`);
   }

   const menuButtonClicked = () => {
      changeShowMenuState(!showMenu);
   };

   const dismissMenu = () => {
      changeShowMenuState(!showMenu);
   };

   return (
      <div>
         {showMenu && <Menu func={dismissMenu} userID={currestUserID}></Menu>}

         <span>
            <button onClick={menuButtonClicked}>
               <img src={menuIcon} alt="Menu Button" />
            </button>
            <h1>Main Page</h1>
         </span>

         {
            // Temp button to go to post
         }
         <button onClick={() => buttonClick(postId)}>Go to post</button>
      </div>
   );
}
