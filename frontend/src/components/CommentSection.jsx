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

   const handleCommentTextInput = (text) => {
      setCommentInputText(text);
   };

   const addCommentButtonPressed = () => {
      props.addComment(commentInputText);
      setCommentInputText("");
   };

   return (
      <ul className="list bg-base-100 rounded-box shadow-md">
         <li className="p-4 pb-2 text-xl tracking-wide text-white">
            Comment Section:
            <TextInput
               value={commentInputText}
               onChange={(e) => {
                  handleCommentTextInput(e.target.value);
               }}
               placeholder="Add a comment!"
            ></TextInput>
            <span>
               <Button
                  func={addCommentButtonPressed}
                  title="Add Comment"
               ></Button>
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
