export default function ImageDisplay(props) {
   return (
      <div className="card bg-base-100 w-96 shadow-sm">
         <figure>
            <img
               src={URL.createObjectURL(props.imageFile)}
               alt={props.imageFile.name}
            />
         </figure>
      </div>
   );
}
