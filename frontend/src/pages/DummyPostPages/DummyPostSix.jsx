import {
   PostHeading,
   PostCaption,
   PostImage,
   PostInformation,
   Comment,
   CommentSectionHeader,
   CommentBlock,
} from "../../components/PostComponents";

import picture from "../../sampleImages/italian.png";

import { use, useEffect, useState } from "react";

export default function DummyPostSix() {
   {
      /** Sample Info */
   }
   let username = "CityEatsReview";
   let datePostCreated = "10/04/2025";
   let timePostCreated = "35 Minutes";
   let caption =
      "Finally tried the Italian spot everyone's been talking about — and honestly, it lived up to the hype. Rich flavors, warm atmosphere, and top-tier service. Not sure what the complaints are about. 🍷🍝🔥";

   const [commentsList, changeCommentListState] = useState([
      new Comment(
         "1",
         "Thank you! I thought the same thing. That truffle ravioli was next-level.",
         "pastaislife",
         "04/10/2025",
         28,
         true
      ),
      new Comment(
         "2",
         "I had the same experience — cozy, classy, and the wine pairing was on point.",
         "vinoVeritas",
         "04/10/2025",
         19,
         false
      ),
      new Comment(
         "3",
         "People just love to complain. This place nailed it from apps to dessert.",
         "noComplaintsClub",
         "05/10/2025",
         24,
         true
      ),
      new Comment(
         "4",
         "Sat at the chef’s counter — incredible experience. You could taste the effort.",
         "openKitchenFan",
         "05/10/2025",
         15,
         false
      ),
      new Comment(
         "5",
         "Went in skeptical, walked out planning my next reservation. That’s how good it was.",
         "forkYeahNYC",
         "05/10/2025",
         31,
         true
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
