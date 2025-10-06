import {
   PostHeading,
   PostCaption,
   PostImage,
   PostInformation,
   Comment,
   CommentSectionHeader,
   CommentBlock,
} from "../../components/PostComponents";

import picture from "../../sampleImages/hot_dog_cart.png";

import { use, useEffect, useState } from "react";

export default function DummyPostTwo() {
   {
      /** Sample Info */
   }
   let username = "StreetEatsNYC";
   let datePostCreated = "9/30/2025";
   let timePostCreated = "15 Minutes";
   let caption =
      "Sizzling sausages, the hum of the city, and the unmistakable aroma of grilled onions – nothing says NYC like a classic hotdog stand on a bustling Manhattan corner. This little cart has been serving hungry New Yorkers and tourists alike for decades, offering a quick bite with big flavor. From Wall Street suits to wide-eyed visitors, everyone finds common ground in a good hotdog. 🌭🗽🔥";

   const [commentsList, changeCommentListState] = useState([
      new Comment(
         "1",
         "This cart is legendary! I used to grab a hotdog here every day after work.",
         "nycFoodie89",
         "01/10/2025",
         31,
         true
      ),
      new Comment(
         "2",
         "The smell of grilled onions in the air always draws me in. Pure NYC magic.",
         "urbanEater",
         "02/10/2025",
         24,
         false
      ),
      new Comment(
         "3",
         "Can we talk about how crispy the buns are? Game changer.",
         "hotdogLover777",
         "03/10/2025",
         18,
         true
      ),
      new Comment(
         "4",
         "Visited New York last month and this cart was a highlight. So good!",
         "travelBug5",
         "04/10/2025",
         39,
         false
      ),
      new Comment(
         "5",
         "Nothing beats grabbing a hotdog while watching the taxis zoom by.",
         "cityWalker",
         "05/10/2025",
         22,
         true
      ),
      new Comment(
         "6",
         "I swear the secret is in the mustard. It has a kick I’ve never had anywhere else.",
         "mustardMaestro",
         "06/10/2025",
         15,
         false
      ),
      new Comment(
         "7",
         "Street food like this is the soul of New York. Forget fancy restaurants!",
         "biteSizedBigApple",
         "07/10/2025",
         27,
         true
      ),
      new Comment(
         "8",
         "Met the vendor once – nicest guy ever. Even gave my kid an extra dog for free.",
         "dadOnTheGo",
         "08/10/2025",
         33,
         false
      ),
      new Comment(
         "9",
         "Do they take Venmo now? Asking for a very hungry friend.",
         "digitalNomNoms",
         "09/10/2025",
         11,
         true
      ),
      new Comment(
         "10",
         "This hotdog stand is a must-stop every time I visit NYC. Pure nostalgia in a bun.",
         "memoryMuncher",
         "10/10/2025",
         42,
         false
      ),
   ]);

   // TEMPORARY
   const [commentsListIndex, changeCommentsListIndexState] = useState(11);

   const [likedPostState, changeLikedPostState] = useState(false);
   const [likeCount, changeLikeCountState] = useState(5);

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
         <PostImage img={picture}></PostImage>
         <PostInformation
            date={datePostCreated}
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
