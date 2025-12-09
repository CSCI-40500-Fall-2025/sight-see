import { useState, useRef } from "react";
import {
   Navbar,
   ImageUpload,
   ImageDisplay,
   TextInput,
   Button,
   CaptionForm,
} from "../components";

export default function CreatePostPage() {
   const [imageFile, setImageFile] = useState(null);
   const [showImageUploadError, setShowImageUploadError] = useState(false);

   // Function to get the current location of user
   const getLocation = async () => {
      return new Promise((resolve, reject) => {
         // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
         if (navigator.geolocation) {
            // Function that gets the user's current location
            navigator.geolocation.getCurrentPosition(
               // Location is good, return coordinates
               (pos) => resolve(pos.coords),

               // Error in getting location
               (err) => reject(err)
            );
         }
         // Geolocation not supported by user's device/browser
         else {
            reject("Location not supported");
         }
      });
   };

   /** Use regular expressions to validate caption input
    *  Constraints:
    *    Must be between 0 and 280 characters
    *    Must only contain letters, numbers, and punctuation or emojis?
    *    Check for SQl injection
    */
   const validateCaptionInput = (caption) => {
      const characterRegex = /^[\p{L}\p{N}\p{P}\p{Zs}\p{Emoji}]{0,280}$/u;

      // Case Sensitive: will not match 'select'
      const bannedWordsRegex =
         /\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|EXEC|UNION|WHERE|FROM|JOIN)\b/;

      // SQL special characters
      /** Looks for:
       *  '
       *  "
       *  ;
       *  \
       *  -
       *  *
       *  /
       *  (
       *  )
       *  =
       *  <
       *  >
       */
      const bannedCharacters = /['";\\\-*\/()=<>]/;

      // Check that has only allowed characters and is within allowed length
      const containsAllowedCharacters = characterRegex.test(caption);

      if (!containsAllowedCharacters) {
         // Error handle TODO
         console.log("no good");
         return false;
      }

      // Check that there are no banned keywords
      const containsBannedWords = bannedWordsRegex.test(caption);

      if (containsBannedWords) {
         // Error handle TODO
         console.log("no good");

         return false;
      }

      // Check that there are no banned characters
      const containsBannedCharacters = bannedCharacters.test(caption);

      if (containsBannedCharacters) {
         // Error handle TODO
         console.log("no good");

         return false;
      }

      // String is good
      return true;
   };

   const handleSubmit = async (caption) => {
      const isValidCaption = validateCaptionInput(caption);

      if (!isValidCaption) {
         // Error handling TODO
         console.log("bad caption");
         return;
      }

      console.log("GOOD");

      // Get date and time
      const time = Date.now();
      console.log(time);

      // Get image?

      // Async logic
      try {
         // Get location
         const { latitude, longitude } = await getLocation();

         console.log("Lat: ", latitude);
         console.log("Long:", longitude);

         // Post to backend here
      } catch (error) {
         console.log(error);
      }
   };

   const handleImageUploadSuccess = (file) => {
      setShowImageUploadError(false);
      setImageFile(file);
   };

   const handleImageUploadError = () => {
      setShowImageUploadError(true);
   };

   return (
      <div>
         <Navbar></Navbar>

         <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend text-center text-2xl font-semibold">
               Create A Post!
            </legend>

            {imageFile ? (
               <>
                  <label className="label">Image Preview</label>
                  <ImageDisplay imageFile={imageFile}></ImageDisplay>
               </>
            ) : (
               <>
                  <label className="label">Pick an Image to Upload!</label>
                  <ImageUpload
                     onImageUpload={(file) => handleImageUploadSuccess(file)}
                     onError={handleImageUploadError}
                  ></ImageUpload>
               </>
            )}

            {showImageUploadError && (
               <div style={{ color: "red" }}>
                  Unsupported Image type. Try again.
               </div>
            )}

            {
               /** Remove this! After testing */
               imageFile && (
                  <div>
                     {imageFile.name} <br></br> {imageFile.type}
                  </div>
               )
            }

            {imageFile && (
               <CaptionForm
                  onSubmit={handleSubmit}
                  imageFile={imageFile}
               ></CaptionForm>
            )}
         </fieldset>
      </div>
   );
}

{
   /** ML Component Flow:
    *    If a user uploads a heic image, make them choose again
    *
    *    Once image is display, give user three options for captioning:
    *       No caption wanted
    *       User enters their own caption
    *       User can generate a caption
    *          If user decides to generate a caption:
    *             Ask them for a mood.
    *             Ask them to provide some details about what the picture means to them: maybe ask them what memory comes up in this image, or something
    */
}
