import { useState } from "react";

{
   /** Component to Display a Single Comment
    * Props:
    *    username:            Username of commentor
    *    text:                Content of comment
    *    date:                Date comment created
    *    likeCount:           Like Count of Comment
    *    userLikedComment:    If current user has Liked this specific comment
    */
}
export default function CommentBlock(props) {
   const [commentLikeCount, changeCommentLikeCountState] = useState(
      props.likeCount
   );

   const [userLikedComment, changeUserLikedCommentState] = useState(
      props.userLiked
   );

   const likeButtonClicked = () => {
      // If comment already liked, dislike
      if (userLikedComment) {
         // update server
         let success = true;

         // change locally
         if (success) {
            changeUserLikedCommentState(false);
            changeCommentLikeCountState(commentLikeCount - 1);
         }
      } else {
         // Like the comment
         // update server
         let success = true;

         if (success) {
            changeUserLikedCommentState(true);
            changeCommentLikeCountState(commentLikeCount + 1);
         }
      }
   };

   return (
      <li className="list-row">
         <div className="list-col-grow">
            <div className="font-bold">{props.username}</div>
            <p className="list-col-wrap text-s  ">{props.text}</p>
            <p className="text-opacity-50 text-gray-50 text-[15px]">
               {props.date}
            </p>
         </div>

         <div className="flex flex-col items-center justify-start">
            <button
               className="btn btn-square btn-ghost"
               onClick={likeButtonClicked}
            >
               <svg
                  className="size-[1.6em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
               >
                  <g
                     strokeLinejoin="round"
                     strokeLinecap="round"
                     strokeWidth="2"
                     fill={userLikedComment ? "red" : "none"}
                     stroke="currentColor"
                  >
                     <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </g>
               </svg>
            </button>
            <p
               className={
                  userLikedComment
                     ? "text-red-700 font-bold"
                     : "text-white font-bold"
               }
            >
               {commentLikeCount}
            </p>
         </div>
      </li>
   );
}
