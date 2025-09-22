import { use, useEffect, useState } from "react";
import profilePic from "../assets/profile_icon.png";
import treePic from "../assets/post_tree.png";

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
function PostHeading(props) {
   return (
      <div id="PostHeading">
         <img src={profilePic} alt="Profile Pic" />
         <span>{props.username}</span>
      </div>
   );
}

{
   /** Post Image component
    * Future Props:
    *    img:        The img to be displayed
    * Concerns: Storing and retrieving image pics
    *    In this basic ui, use dummy tree image in asset folder
    */
}
function PostImage(props) {
   return <img src={treePic}></img>;
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

{
   /** Post Caption Component
    * Props:
    *    caption:       the caption for the post
    */
}
function PostCaption(props) {
   return <div>{props.caption}</div>;
}

{
   /** Comment Section Header Component
    * Both the heading itself, and a button to add a comment
    * Props:
    *    func: Add a comment to the commentsList variable in PostPage component
    */
}
function CommentSectionHeader(props) {
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
class Comment {
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
function CommentBlock(props) {
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

export default function PostPage() {
   {
      /** Sample Info */
   }
   let username = "LeafyExcitement";
   let datePostcreated = "8/20/2025";
   let timePostCreated = "5 Minutes";
   let caption =
      "A symbol of resilience and growth, this majestic tree stands as a testament to nature’s ability to thrive through time. With roots deep in the earth and branches stretching toward the heavens, it tells a story of patience, endurance, and the quiet beauty of the natural world. Every leaf whispers the secrets of the forest, every twist in the trunk a chapter in a centuries-old tale. 🌳✨";
   const [likedPostState, changeLikedPostState] = useState(false);
   const [likeCount, changeLikeCountState] = useState(5);
   const [commentsList, changeCommentListState] = useState([
      new Comment(
         "1",
         "This tree is so beautiful, I love its vibrant green leaves!",
         "treeLover123",
         "01/09/2025",
         14,
         true
      ),
      new Comment(
         "2",
         "I love how the oak tree's branches stretch out. It's majestic!",
         "natureFan",
         "02/09/2025",
         22,
         false
      ),
      new Comment(
         "3",
         "It's amazing how trees provide oxygen and shade. They are life!",
         "ecoWarrior",
         "03/09/2025",
         30,
         true
      ),
      new Comment(
         "4",
         "Have you ever seen a giant sequoia? It's mind-blowing how tall they grow!",
         "treeHugger55",
         "04/09/2025",
         18,
         false
      ),
      new Comment(
         "5",
         "Planting trees is such a simple way to help the environment.",
         "greenThumb",
         "05/09/2025",
         12,
         true
      ),
      new Comment(
         "6",
         "The way trees change color in the fall is always so magical.",
         "autumnLover",
         "06/09/2025",
         27,
         false
      ),
      new Comment(
         "7",
         "I think I read that some trees can live for over a thousand years. Incredible!",
         "forestExplorer",
         "07/09/2025",
         9,
         true
      ),
      new Comment(
         "8",
         "I planted a sapling in my backyard today. Can’t wait to see it grow into a mighty oak!",
         "futureForest",
         "08/09/2025",
         35,
         false
      ),
      new Comment(
         "9",
         "The roots of trees are so important for preventing soil erosion. They protect the earth!",
         "earthDefender",
         "09/09/2025",
         21,
         true
      ),
      new Comment(
         "10",
         "I once visited the Amazon rainforest. The trees there are like nothing else on earth.",
         "wildLifeAdventurer",
         "10/09/2025",
         45,
         false
      ),
   ]);

   // TEMPORARY
   const [commentsListIndex, changeCommentsListIndexState] = useState(11);

   const updatePostLikeCount = () => {
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

   const addCommentToList = (text) => {
      const current = new Comment(
         commentsListIndex,
         text,
         username,
         "8/20/2025",
         0,
         false
      );

      changeCommentsListIndexState(commentsListIndex + 1);

      changeCommentListState([current, ...commentsList]);
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
            likeButtonFunc={updatePostLikeCount}
         ></PostInformation>
         <PostCaption caption={caption}></PostCaption>
         <CommentSectionHeader func={addCommentToList}></CommentSectionHeader>

         {/** Comment Section
          * TO DO: Make the comment section itself it's own component?
          */}
         <div>
            {commentsList.map((comment) => {
               return (
                  <CommentBlock
                     key={comment.id}
                     username={comment.username}
                     text={comment.text}
                     date={comment.date}
                     likeCount={comment.likeCount}
                     userLiked={comment.userLiked}
                  />
               );
            })}
         </div>
      </div>
   );
}
