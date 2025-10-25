/** Component For Text Input
 *  Props:
 *    value:                        variable that holds the text input
 *    onChange:                     function to call to handle text change
 *    placeholder:                  placeholder text
 */
export default function TextInput(props) {
   return (
      <textarea
         value={props.value}
         onChange={props.onChange}
         className="textarea"
         placeholder={props.placeholder}
      ></textarea>
   );
}
