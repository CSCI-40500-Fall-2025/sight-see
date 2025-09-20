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

{
   /** Component for Post Caption */
}
function PostCaption(props) {
   return <div>{props.caption}</div>;
}

{
   /** Component for Comment Section Header */
}
function CommentSectionHeader(props) {
   return <h1>Comment Section: </h1>;
}

{
   /** Class to organize a Comment's information */
}
class Comment {
   constructor(id, text, username, date, likeCount) {
      this.id = id;
      this.text = text;
      this.username = username;
      this.date = date;
      this.likeCount = likeCount;
   }
}

{
   /** Component to Hold a Single Comment
    * Props:
    *    username:  Username of commentor
    *    text:      Content of comment
    *    date:      Date comment created
    *    likeCount: Like Count of Comment
    */
}
function CommentBlock(props) {
   return (
      <div>
         <span>
            {props.username} <span>{props.date}</span>
         </span>
         <br />
         <span>{props.text}</span>
         <br />
         <span>Likes: {props.likeCount}</span>
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
         14
      ),
      new Comment(
         "2",
         "I love how the oak tree's branches stretch out. It's majestic!",
         "natureFan",
         "02/09/2025",
         22
      ),
      new Comment(
         "3",
         "It's amazing how trees provide oxygen and shade. They are life!",
         "ecoWarrior",
         "03/09/2025",
         30
      ),
      new Comment(
         "4",
         "Have you ever seen a giant sequoia? It's mind-blowing how tall they grow!",
         "treeHugger55",
         "04/09/2025",
         18
      ),
      new Comment(
         "5",
         "Planting trees is such a simple way to help the environment.",
         "greenThumb",
         "05/09/2025",
         12
      ),
      new Comment(
         "6",
         "The way trees change color in the fall is always so magical.",
         "autumnLover",
         "06/09/2025",
         27
      ),
      new Comment(
         "7",
         "I think I read that some trees can live for over a thousand years. Incredible!",
         "forestExplorer",
         "07/09/2025",
         9
      ),
      new Comment(
         "8",
         "I planted a sapling in my backyard today. Can’t wait to see it grow into a mighty oak!",
         "futureForest",
         "08/09/2025",
         35
      ),
      new Comment(
         "9",
         "The roots of trees are so important for preventing soil erosion. They protect the earth!",
         "earthDefender",
         "09/09/2025",
         21
      ),
      new Comment(
         "10",
         "I once visited the Amazon rainforest. The trees there are like nothing else on earth.",
         "wildLifeAdventurer",
         "10/09/2025",
         45
      ),
   ]);

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
         <PostCaption caption={caption}></PostCaption>
         <CommentSectionHeader></CommentSectionHeader>

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
                  />
               );
            })}
         </div>
      </div>
   );
}
