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

export default function DummyPostFive() {
   {
      /** Sample Info */
   }
   let username = "CityEatsReview";
   let datePostCreated = "10/03/2025";
   let timePostCreated = "1 Hour";
   let caption =
      "Stopped by one of NYC’s most talked-about Italian spots last night. Great ambiance, decent food — maybe not quite the hype, but still a solid night out. 🍝🗽";

   const [commentsList, changeCommentListState] = useState([
      new Comment(
         "1",
         "Totally agree. The pasta was good, but the service felt a bit rushed.",
         "honestFork",
         "03/10/2025",
         17,
         true
      ),
      new Comment(
         "2",
         "I went last month! Vibes were amazing, but the carbonara was just okay.",
         "foodieOnPrince",
         "03/10/2025",
         21,
         false
      ),
      new Comment(
         "3",
         "It’s one of those places you go for the name, not necessarily the flavor.",
         "platePerspective",
         "04/10/2025",
         13,
         true
      ),
      new Comment(
         "4",
         "Honestly expected more for the price. Not bad, just not memorable.",
         "cityTastebuds",
         "04/10/2025",
         19,
         false
      ),
      new Comment(
         "5",
         "I liked the tiramisu, but yeah — not sure I'd wait in line again.",
         "dessertFirstAlways",
         "05/10/2025",
         25,
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
