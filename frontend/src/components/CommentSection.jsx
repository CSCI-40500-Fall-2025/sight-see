import { useRef, useState } from "react";
import { Button, CommentBlock, TextInput } from ".";

{
   /**
    * Component for the Comment Section as a whole
    * Props:
    *    addComment:          Callback function to PostPage component, used to let PostPage know new comment is being posted
    *    commentsList:        List of comments from PostPage, used to create rows of comments
    *
    */
}

export default function CommentSection(props) {
   const [commentInputText, setCommentInputText] = useState("");

   const handleCommentTextChange = (text) => {
      // Remove new lines from input
      const removedNewLines = text.replace(/[\r\n]+/g, "");

      // Limit to 140 characters
      const truncated = removedNewLines.slice(0, 140);

      // Set the caption variable
      setCommentInputText(truncated);
   };

   const validateCommentInputText = () => {
      // Comment text length in [1, 140]
      const characterRegex = /^[\p{L}\p{N}\p{P}\p{Zs}\p{Emoji}]{1,140}$/u;

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
      const containsAllowedCharacters = characterRegex.test(commentInputText);

      if (!containsAllowedCharacters) {
         // Error handle TODO
         console.log("no good");
         return false;
      }

      // Check that there are no banned keywords
      const containsBannedWords = bannedWordsRegex.test(commentInputText);

      if (containsBannedWords) {
         // Error handle TODO
         console.log("no good");

         return false;
      }

      // Check that there are no banned characters
      const containsBannedCharacters = bannedCharacters.test(commentInputText);

      if (containsBannedCharacters) {
         // Error handle TODO
         console.log("no good");

         return false;
      }

      // String is good
      return true;
   };

   const handleSubmit = () => {
      // If no comment text return
      if (commentInputText.length === 0) {
         alert("No comment!");
         return;
      }

      const valid = validateCommentInputText();

      if (valid) {
         // post to backend here

         // Temp
         props.addComment(commentInputText);
         setCommentInputText("");
      } else {
         alert("Invalid comment");
      }
   };

   return (
      <ul className="list bg-base-100 rounded-box shadow-md">
         <li className="p-4 pb-2 text-xl tracking-wide text-white">
            Comment Section:
            <TextInput
               value={commentInputText}
               onChange={(e) => {
                  handleCommentTextChange(e.target.value);
               }}
               placeholder="Add a comment!"
            ></TextInput>
            <span>
               <Button func={handleSubmit} title="Add Comment"></Button>
            </span>
         </li>
         {props.commentsList.map((comment) => {
            return (
               <CommentBlock
                  key={comment.id}
                  username={comment.username}
                  text={comment.text}
                  date={comment.date}
                  likeCount={comment.likes}
                  userLiked={comment.likeStatus}
               ></CommentBlock>
            );
         })}
      </ul>
   );
}
