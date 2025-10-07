import { useRef } from "react";
import { Button, CommentBlock } from "../components";

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
   const commentInputText = useRef();

   const addCommentButtonPressed = () => {
      props.addComment(commentInputText.current.value);
   };

   return (
      <ul className="list bg-base-100 rounded-box shadow-md">
         <li className="p-4 pb-2 text-xl tracking-wide text-white">
            Comment Section:
            <textarea
               ref={commentInputText}
               class="textarea"
               placeholder="Add a comment!"
            ></textarea>
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
                  likeCount={comment.likeCount}
                  userLiked={comment.userLiked}
               ></CommentBlock>
            );
         })}
      </ul>
   );
}
