import { useState } from "react";
import TextInput from "../TextInput";
import Button from "../Button";

function CaptionForm(props) {
   const [captionSelect, setCaptionSelect] = useState("0");
   const [imageDetails, setImageDetails] = useState("");
   const [caption, setCaption] = useState("");
   const [generatedCaption, setGeneratedCaption] = useState(false);

   console.log(imageDetails);

   const [generatedCaptionMood, setGeneratedCaptionMood] = useState("");
   const handleCaptionChange = (text) => {
      // Remove new lines from input
      const removedNewLines = text.replace(/[\r\n]+/g, "");

      // Limit to 280 characters
      const truncated = removedNewLines.slice(0, 280);

      // Set the caption variable
      setCaption(truncated);
   };

   const handleImageDetailChange = (text) => {
      // Remove new lines from input
      const removedNewLines = text.replace(/[\r\n]+/g, "");

      // Limit to 280 characters
      const truncated = removedNewLines.slice(0, 280);

      // Set the caption variable
      setImageDetails(truncated);
   };

   const handleGenerate = async () => {
      try {
         console.log("Cools");
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="flex flex-col">
         <select
            className="select"
            value={captionSelect}
            onChange={(e) => {
               setCaption("");
               setCaptionSelect(e.target.value);
            }}
         >
            <option value="0" disabled>
               Choose a Caption Type
            </option>
            <option value="1">No caption</option>
            <option value="2">Write your own caption</option>
            <option value="3">Generate a caption</option>
         </select>

         {captionSelect === "2" && (
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

         {captionSelect === "3" && (
            <>
               <select
                  className="select"
                  value={generatedCaptionMood}
                  onChange={(e) => {
                     setGeneratedCaptionMood(e.target.value);
                  }}
               >
                  <option value="" disabled>
                     Choose a mood for your caption!
                  </option>
                  <option value="Happy">Happy</option>
                  <option value="Sad">Sad</option>
                  <option value="Anger">Anger</option>
                  <option value="Excited">Excited</option>
                  <option value="Disgust">Disgust</option>
                  <option value="Silly">Silly</option>
                  <option value="Surprise">Surprise</option>
               </select>

               <label className="label">
                  Optional: Add some context about the image!
               </label>
               <TextInput
                  value={imageDetails}
                  onChange={(e) => {
                     handleImageDetailChange(e.target.value);
                  }}
                  placeholder="Optional: Add some context about the image!"
               ></TextInput>

               {generatedCaptionMood !== "" && (
                  <Button
                     func={() => {
                        handleGenerate();
                     }}
                     title="Generate!"
                     className="btn-lg	"
                  ></Button>
               )}
            </>
         )}

         {
            // The post button
            (captionSelect === "1" ||
               captionSelect === "2" ||
               // change this below
               (captionSelect === "3" && generatedCaption)) && (
               <Button
                  func={() => {
                     handleGenerate();
                  }}
                  title="Post!"
                  className="btn-lg	"
               ></Button>
            )
         }
      </div>
   );
}
export default CaptionForm;
