import { useState, useRef } from "react";
import {
   Navbar,
   ImageUpload,
   ImageDisplay,
   TextInput,
   Button,
} from "../components";

export default function CreatePostPage() {
   const [imageFile, setImagePath] = useState(null);
   const [caption, setCaption] = useState("");

   const handleCaptionChange = (text) => {
      // Remove new lines from input
      const removedNewLines = text.replace(/[\r\n]+/g, "");

      // Limit to 280 characters
      const truncated = removedNewLines.slice(0, 280);

      // Set the caption variable
      setCaption(truncated);
   };

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
   const validateCaptionInput = () => {
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

   const handleSubmit = async () => {
      const isValidCaption = validateCaptionInput(caption);

      if (!isValidCaption) {
         // Error handling TODO
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
                     onImageUpload={(file) => setImagePath(file)}
                  ></ImageUpload>
               </>
            )}

            {imageFile && (
               <>
                  <label className="label">Add a caption!</label>
                  <TextInput
                     value={caption}
                     onChange={(e) => {
                        handleCaptionChange(e.target.value);
                     }}
                     placeholder="Add a caption to your photo!"
                  ></TextInput>
               </>
            )}

            {imageFile && <Button func={handleSubmit} title="Post!"></Button>}
         </fieldset>
      </div>
   );
}

{
   /** Flow:
    *       On create button click from main page: under profile dropdown
    *       Nav to new page
    *       Here, you can upload an image (temp, will change to taking a picture soon!)   : ImageUpload component
    *       Once the picture is uploaded, display it and bring up a caption input box     : ImageDisplay and TextInput components
    *       Here the user inputs a short comment
    *          Validate: maybe short captions only                                        : handlecaptionChange
    *       Once the comment is good:                                                     : NOT present
    *             Present a button that will signal to user to create post
    *
    *       Once the button is pressed                                                    : handleSubmit
    *
    *          Further validate comment input text                                        : validateCaptionInput
    *          Get the image data                                                         : NOT present
    *          Try to get the location of user first                                      : getLocation
    *             if fail, then stop and bring up error
    *          Package everything and post to backend
    *
    *          Wait for response
    *             If good, do something TODO
    *                Suggestions: navigate back to main page with some sort of refresh happening to the map?
    *             If bad, post error
    *
    *
    *    Potential Issues:
    *       IPhone image format is NOT supported on all major browsers (only Safari (and maybe IOS browsers using WebKit (so all of them)))
    *          So, any images in this format must be changed!
    *
    *          Ignore for now, since this will most likely depends on how taking a picture will be implemented
    *          Just use pictures in png format for current testing
    */
}
