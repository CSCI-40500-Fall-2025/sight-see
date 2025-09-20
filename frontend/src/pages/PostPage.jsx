{
   /** TO DO:
    * 1. Make heading for post
    * 2. add heading for profile pic and username of poster
    * 3. image
    * 4. heading for time and date + lke button
    * 5. comments
    */
}

import { useEffect, useState } from "react";
import profilePic from "../assets/profile_icon.png";
import treePic from "../assets/post_tree.png";

{
   /** Component for Post Heading
    *    The little bar above the picture
    * Contains: profile pic, username of post's creator
    * Concerns: Storing and retrieving profile pics
    *    Falls under storing images
    *    How to display the returned image?
    * In this basic ui, use dummy profile image in asset folder
    */
}
function PostHeading(props) {
   return (
      <div id="PostHeading">
         <img src={profilePic} alt="Profile Pic" />
         <span>{props.username}</span>
      </div>
   );
}

{
   /** Component for Post Heading
    * Contains: Post image
    * Concerns: Storing and retrieving image pics
    *    In this basic ui, use dummy tree image in asset folder
    */
}
function PostImage(props) {
   return <img src={treePic}></img>;
}

{
   /** Component for Post Information
    * Contains: Time post was created, time posted ago?, Like button
    * Potential feature: number of likes displayed
    *
    */
}
function PostInformation(props) {
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

export default function PostPage() {
   {
      /** Sample Info */
   }
   let username = "LeafyExcitement";
   let datePostcreated = "8/20/2025";
   let timePostCreated = "5 Minutes";
   const [likedPostState, changeLikedPostState] = useState(false);
   const [likeCount, changeLikeCountState] = useState(5);

   const updateLikeCount = () => {
      if (likedPostState) {
         /** User unlikes the post */
         /** Backend server update here */
         let success = true;
         if (success) {
            changeLikeCountState(likeCount - 1);
            changeLikedPostState(false);
         }
      } else {
         /** User likes the post */
         /** Backend server update here */
         let success = true;
         if (success) {
            changeLikeCountState(likeCount + 1);
            changeLikedPostState(true);
         }
      }
   };
   return (
      <div>
         <PostHeading username={username}></PostHeading>
         <PostImage></PostImage>
         <PostInformation
            date={datePostcreated}
            time={timePostCreated}
            likeCount={likeCount}
            likeButtonText={likedPostState ? "Dislike" : "Like"}
            likeButtonFunc={updateLikeCount}
         ></PostInformation>
      </div>
   );
}
