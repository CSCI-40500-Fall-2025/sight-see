import { useState } from "react";
import TextInput from "../TextInput";
import Button from "../Button";
import axios from "axios";

function CaptionForm(props) {
   const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
   const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL;

   const [captionSelect, setCaptionSelect] = useState("0");
   const [caption, setCaption] = useState("");

   const [generatedCaption, setGeneratedCaption] = useState(false); // For after caption generation, mark when generation is complete
   const [generating, setGenerating] = useState(false); // For during caption generation, active only when generating
   const [generatedCaptionMood, setGeneratedCaptionMood] = useState("None");
   const [imageContext, setImageContext] = useState("");

   const handleCaptionChange = (text) => {
      // Remove new lines from input
      const removedNewLines = text.replace(/[\r\n]+/g, "");

      // Limit to 280 characters
      const truncated = removedNewLines.slice(0, 280);

      // Set the caption variable
      setCaption(truncated);
   };

   const handleImageContextChange = (text) => {
      // Remove new lines from input
      const removedNewLines = text.replace(/[\r\n]+/g, "");

      // Limit to 280 characters
      const truncated = removedNewLines.slice(0, 280);

      // Set the caption variable
      setImageContext(truncated);
   };

   const readImage = (imageFile) => {
      return new Promise((resolve, reject) => {
         const reader = new FileReader();

         reader.onloadend = (e) => {
            // Strip the uri at the beginning of string
            // Request only needs the raw base64
            const stripped = e.target.result.replace(
               /^data:image\/\w+;base64,/,
               ""
            );

            resolve(stripped);
         };

         reader.readAsDataURL(imageFile);

         reader.onerror = (error) => reject(error);
      });
   };

   const handleGenerate = async () => {
      try {
         // Can refine prompt?
         const prompt = JSON.stringify(`
         User Context: ${imageContext}
         Mood/Tone: ${generatedCaptionMood}
         Task:
         1. Analyze the provided image internally and understand what is shown.
         2. Generate one social media caption (1–280 characters) following these rules:
            a. If mood is provided, the caption must follow that mood.
            b. If mood = None, generate the caption using only the image content + context.
            c. If context = None, generate the caption using only the image content.
            d. If both mood and context are missing, generate a natural caption based solely on the image content.
         3. Output only the final caption. No explanations, no image descriptions, no metadata, and no extra text.
         `);

         // Get image data as base64
         const base64 = await readImage(props.imageFile);

         console.log("Image:", base64);

         // Prepare body of request
         const body = {
            contents: {
               role: "USER",
               parts: [
                  {
                     inlineData: {
                        data: base64,
                        mimeType: props.imageFile.type,
                     },
                  },
                  {
                     text: prompt,
                  },
               ],
            },
         };

         // Prepare something to indicated waiting time
         setGenerating(true);

         // Post
         const response = await axios.post(
            `https://aiplatform.googleapis.com/v1/publishers/google/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
            body
         );

         setGenerating(false);
         setGeneratedCaption(true);
         handleCaptionChange(response.data.candidates[0].content.parts[0].text);
         setCaptionSelect("2"); // prevent user from generating another caption

         console.log(caption);

         {
            //
            /** TODO:
             * refactor code so that control is back in the createpostpage component
             * fill out handle submit
             *
             */
         }
      } catch (error) {
         setGenerating(false);
         console.log(error);
      }
   };

   const handleSubmit = () => {
      props.onSubmit(caption);
   };

   return (
      <div className="flex flex-col">
         <select
            className="select"
            value={captionSelect}
            onChange={(e) => {
               setCaptionSelect(e.target.value);
            }}
         >
            <option value="0" disabled>
               Choose a Caption Type
            </option>
            <option value="1">No caption</option>
            <option value="2">Write your own caption</option>
            <option value="3" disabled={generatedCaption}>
               Generate a caption
            </option>
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

         {captionSelect === "3" && !generatedCaption && (
            <>
               <select
                  className="select"
                  value={generatedCaptionMood}
                  onChange={(e) => {
                     setGeneratedCaptionMood(e.target.value);
                  }}
               >
                  <option value="None">
                     Choose an optional mood for your caption!
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
                  value={imageContext}
                  onChange={(e) => {
                     handleImageContextChange(e.target.value);
                  }}
                  placeholder="Optional: Add some context about the image!"
               ></TextInput>

               {!generatedCaption && !generating && (
                  <Button
                     func={() => {
                        handleGenerate();
                     }}
                     title="Generate!"
                     className="btn-lg	"
                  ></Button>
               )}

               {/** MODEL CHOSEN: gemini-2.5-flash-lite
                * Send image + prompt to model
                */}
            </>
         )}

         {captionSelect === "3" && generating && (
            <span className="loading loading-spinner loading-xl"></span>
         )}

         {captionSelect === "3" && generatedCaption && (
            <>
               <label className="label">View your caption!</label>
               <TextInput
                  value={caption}
                  onChange={(e) => {
                     handleCaptionChange(e.target.value);
                  }}
                  placeholder=""
               ></TextInput>
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
                     handleSubmit();
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

/** MESSY! Change it so that CreatePostPage controls state instead of whatever this is right now */
