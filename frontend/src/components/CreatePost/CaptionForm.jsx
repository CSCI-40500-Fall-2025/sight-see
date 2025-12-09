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

   // Read in image in base64 for Gemini
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

   // Get location information from Gemini based on current coords
   const createLocationInformation = async () => {
      // If there is no location throw Error
      if (!props.location) {
         throw new Error("NO LOCATION DATA");
      }

      const prompt = JSON.stringify(
         `You are an expert local guide with access to Google Maps data.
         Your task is to provide accurate, up-to-date, and detailed information about the area near the following coordinates:

         Latitude: ${props.location.latitude}
         Longitude: ${props.location.longitude}

         User Context:
         ${imageContext || "None provided"}
         (The user context should guide which types of places or details you emphasize, without adding non-factual information.)

         Instructions:
         1. Identify 10 to 20 notable places, landmarks, and neighborhoods nearby.
         2. Use the **User Context** to determine:
            - Which places are likely most relevant or useful to the user.
            - Which attributes or details to emphasize (e.g., vibe, scenery, food type, cultural features, family-friendly, nightlife, etc.).
            - How to order or highlight the most context-relevant locations first.
         3. For each place, provide:
            - Name  
            - Type (restaurant, park, museum, café, street, neighborhood, etc.)  
            - Key features, attractions, or activities  
            - Distinctive vibe or atmosphere  
            - Any factual historical, cultural, or aesthetic details  
         4. Include additional contextual information about the surrounding area such as nearby streets, plazas, parks, or public spaces.
         5. Structure the output as a **clear, organized list of bullet points**, one per place.
         6. Make each bullet **rich in descriptive detail**, like a high-quality guide snippet.
         7. All information must remain factual and observable. Do not invent places, opinions, captions, or commentary.
         8. Avoid URLs, links, maps widgets, or metadata.

         Output Example:
         - Place Name 1: Type — Description of key features, activities, vibe, and any unique details.
         - Place Name 2: Type — Description of key features, activities, vibe, and any unique details.
         - Place Name 3: Type — Description of key features, activities, vibe, and any unique details.
         `
      );

      // Create the body of the request
      const body = {
         contents: [
            {
               role: "user",
               parts: [
                  {
                     text: prompt,
                  },
               ],
            },
         ],
         tools: [{ googleMaps: {} }],
         toolConfig: {
            retrievalConfig: {
               latLng: props.location,
            },
         },
      };

      try {
         // Get the location context
         const response = await axios.post(
            `https://aiplatform.googleapis.com/v1/publishers/google/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
            body
         );

         return response.data.candidates[0].content.parts[0].text;
      } catch (error) {
         throw error;
      }
   };

   // Function to generate the caption for the image
   const createCaption = async (geminiLocationInformation) => {
      console.log("In create caption step: ", geminiLocationInformation);
      // Can refine prompt?
      const prompt = JSON.stringify(`
         User Context: ${imageContext}
         Mood/Tone: ${generatedCaptionMood}
         Location Information (Factual Reference Only):
         ${geminiLocationInformation}

         Task:
         Create a single social media caption (1 to 280 characters) by combining:
         - What you infer from the image (internally analyzed)
         - Relevant details from the provided Location Information
         - The User Context and Mood/Tone, when available

         Caption Rules:
         1. First, internally identify whether the image likely matches any place described in the Location Information.
            - If it matches: subtly incorporate specific details about that place (landmarks, streets, atmosphere, or recognizable elements, and the name of the location).
            - If it does not match: use general location context that still fits the surroundings.

         2. Use the Mood/Tone ONLY if provided:
            - If mood exists → the caption must follow that mood.
            - If no mood → ignore mood entirely.

         3. Use the User Context ONLY if provided:
            - If context exists → use it to shape the angle, focus, or emotional framing of the caption.
            - If no context → rely only on image + location info.

         4. Fallback rules:
            - If both mood and context are missing → generate a natural, concise caption based solely on image + location info.

         5. Output Requirements:
            - Output **one** caption only.
            - No explanations, no reasoning steps, no descriptions of the image, and no metadata.
            - Do not include hashtags.
            - Keep the tone natural, human, and suitable for social media.

         Remember:
         The primary goal is to create a strong, context-aware social media caption.
         The mood/tone and user context guide the style and emphasis when they exist, but factual accuracy must come from the location information.
         `);

      // Get image data as base64
      const base64 = await readImage(props.imageFile);

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

      // Post the request for the caption
      const response = await axios.post(
         `https://aiplatform.googleapis.com/v1/publishers/google/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
         body
      );

      setGenerating(false); // Disable the waiting icon
      setGeneratedCaption(true); // Mark the fact that a caption has been generated
      handleCaptionChange(response.data.candidates[0].content.parts[0].text);
   };

   const handleGenerate = async () => {
      // Prepare something to indicated waiting time
      setGenerating(true);

      try {
         // Get the location information from Gemini + Google Maps
         const locationInfo = await createLocationInformation();

         // Create the caption
         await createCaption(locationInfo);
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
         {/*The menu where you pick what you want */}
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
            <option value="3">Generate a caption</option>
         </select>

         {/** If the user chooses to write their own caption */}
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

         {/** If the user chooses to generate a caption, show this options menu so that user can guide the output */}
         {captionSelect === "3" && (
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

               {/** The button for the user to generate a caption. Disable after they create ONE (1) caption so that our rate limits aren't used up by one person */}
               {!generating && (
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

         {/** Spinning wheel to show during the wait for the generated caption */}
         {captionSelect === "3" && generating && (
            <span className="loading loading-spinner loading-xl"></span>
         )}

         {/** After the caption is created, let them edit the caption */}
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
               (captionSelect === "3" && generatedCaption && !generating)) && (
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

/* TO DO:
   Make request to gemini for location information (RAG)

   Change prompt to incorporate the location information
   
   UNRELATED BUT ALSO: the empty caption could be rejected by backend? so remove if needed?
   
   */
