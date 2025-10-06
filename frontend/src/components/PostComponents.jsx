import { use, useEffect, useState } from "react";
import profilePic from "../sampleImages/profile_icon.png";

{
   /** Post Heading Component
    * Props:
    *    username:      the person who created the post
    *
    * Future Props:
    *    profilePic:    the profile picture of the person who made the post
    *       Right now, use dummy picture
    *
    * Concerns:
    *    Storing and retrieving profile pics
    */
}
export function PostHeading(props) {
   return (
      <div id="PostHeading">
         <img src={profilePic} alt="Profile Pic" />
         <span>{props.username}</span>
      </div>
   );
}

{
   /** Post Image component
    * Props:
    *    img:        The img to be displayed
    * Concerns: Storing and retrieving image pics
    *    In this basic ui, use dummy tree image in asset folder
    */
}
export function PostImage(props) {
   return <img src={props.img}></img>;
}

{
   /** Post Information Component
    * Props:
    *    date:                The date the post was created
    *    time:                How long ago the post was created
    *    likeCount:           The like count of the post
    *    likeButtonFunc:      The function that updates like count when like button is pressed
    *    likeButtonText:      To show "Like"/"Dislike" on appropriate like state
    */
}
export function PostInformation(props) {
   return (
      <div>
         <div>
            Posted on : {props.date} <br></br> {props.time} Ago <br />
            Likes: {props.likeCount} <br />
            {/** Like button. Could probably change to thumb ups/heart/some other icon */}
            <button onClick={props.likeButtonFunc}>
               {props.likeButtonText}
            </button>
         </div>
      </div>
   );
}

{
   /** Post Caption Component
    * Props:
    *    caption:       the caption for the post
    */
}
export function PostCaption(props) {
   return <div>{props.caption}</div>;
}

{
   /** Comment Section Header Component
    * Both the heading itself, and a button to add a comment
    * Props:
    *    func: Add a comment to the commentsList variable in PostPage component
    */
}
export function CommentSectionHeader(props) {
   const [showCommentInput, changeCommentInputState] = useState(false);
   const [commentText, changeTextState] = useState("");

   const toggleCommentInput = () => {
      changeCommentInputState(!showCommentInput);
   };

   const addCommentButtonPressed = () => {
      // Server side check here?
      let success = true;

      // Hide the comment input
      if (success) {
         changeCommentInputState(false);
      }

      // Add the new comment locally?
      props.func(commentText);

      // Clear input
      changeTextState("");
   };

   return (
      <div>
         <span>
            <h1>Comment Section:</h1>
            <button onClick={toggleCommentInput}>Add comment</button>
         </span>
         <br />
         {showCommentInput && (
            <span>
               <input
                  className="newCommentInput"
                  value={commentText}
                  onChange={(e) => changeTextState(e.target.value)}
               ></input>
               <button onClick={addCommentButtonPressed}> Add comment</button>
            </span>
         )}
      </div>
   );
}

{
   /** Class to organize a Comment's information */
}
export class Comment {
   constructor(id, text, username, date, likeCount, userLiked) {
      this.id = id;
      this.text = text;
      this.username = username;
      this.date = date;
      this.likeCount = likeCount;
      this.userLiked = userLiked;
   }
}

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
export function CommentBlock(props) {
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
      <div>
         <span>
            {props.username} <span>{props.date}</span>
         </span>
         <br />
         <span>{props.text}</span>
         <br />
         <span>
            Likes: {commentLikeCount}{" "}
            <button onClick={likeButtonClicked}>
               {userLikedComment ? "Liked!" : "Like"}
            </button>
         </span>
      </div>
   );
}
