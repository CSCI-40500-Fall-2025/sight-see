export default function Button(props) {
   return (
      <div>
         <button className={props.className} onClick={props.func}>
            {props.title}
         </button>
      </div>
   );
}