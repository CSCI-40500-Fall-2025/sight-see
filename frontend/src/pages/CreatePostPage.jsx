import { useState } from "react";
import { Navbar, ImageUpload, ImageDisplay } from "../components";

export default function CreatePostPage() {
   const [imageFile, setImagePath] = useState(null);

   return (
      <div>
         <Navbar></Navbar>
         {imageFile ? (
            <ImageDisplay imageFile={imageFile}></ImageDisplay>
         ) : (
            <ImageUpload
               onImageUpload={(file) => setImagePath(file)}
            ></ImageUpload>
         )}
      </div>
   );
}

{
   /** Flow:
    *       On create button click from main page
    *       Nav to new page
    *       Here, you can upload an image (temp, will change to taking a picture soon!)
    *       Once the picture is uploaded, display it and bring up a caption input box
    *       Here the user inputs a short comment
    *          Validate: maybe short captions only? SQL injection, newines, emojis
    *       Once the comment is good:
    *             Present a button that will signal to user to create post
    *       Once the button is pressed
    *          Try to get the location of user first
    *             if fail, then stop and bring up error
    *          If location get is good
    *          Package everything and post to backend
    *
    *       Wait for response
    *          If good, do something TODO
    *          If bad, post error
    *
    *
    *    Potential Issues:
    *       IPhone image format is NOT supported on all major browsers (only Safari)
    *          So, any images in this format must be changed!
    *
    *          Ignore for now, since this will most likely depends on how taking a picture will be implemented
    *          Just use pictures in png format for current testing
    */
}
