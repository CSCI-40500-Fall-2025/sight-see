export default function ImageUpload(props) {
   const handleImageUpload = (e) => {
      // Get the file that was uploaded
      const image = e.target.files[0];

      // If no file was uploaded return early
      if (!image) {
         return;
      }

      console.log(image);

      // Validate input to make sure an image was uploaded
      if (!validateImage(image)) {
         // Ideally output an error here
         console.log("bad image");
         return;
      }

      // Return to parent component with chosen image file
      props.onImageUpload(image);
   };

   const validateImage = (image) => {
      // TODO: check to see
      if (image.type.startsWith("image/")) {
         return true;
      }
   };

   return (
      <input
         type="file"
         accept="image/*"
         onChange={handleImageUpload}
         className="file-input"
         capture="environment"
      />
   );
}

// to do: wrap input into a button
