import { useState } from "react";
import TextInput from "../TextInput";
import Button from "../Button";

function CaptionForm(props) {
   const [selectMenu, setSelectMenu] = useState("0");
   const [caption, setCaption] = useState("");

   const handleCaptionChange = (text) => {
      // Remove new lines from input
      const removedNewLines = text.replace(/[\r\n]+/g, "");

      // Limit to 280 characters
      const truncated = removedNewLines.slice(0, 280);

      // Set the caption variable
      setCaption(truncated);
   };

   return (
      <div className="flex flex-col">
         <select
            className="select"
            value={selectMenu}
            onChange={(e) => {
               setCaption("");
               setSelectMenu(e.target.value);
            }}
         >
            <option value="0" disabled>
               Choose a Caption Type
            </option>
            <option value="1">No caption</option>
            <option value="2">Write your own caption</option>
            <option value="3">Generate a caption</option>
         </select>

         {selectMenu === "2" && (
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

         {selectMenu === "3" && <div>add here later</div>}

         {selectMenu !== "0" && (
            <Button
               func={() => {
                  props.onSubmit(caption);
               }}
               title="Post!"
               className="btn-lg	"
            ></Button>
         )}
      </div>
   );
}
export default CaptionForm;
