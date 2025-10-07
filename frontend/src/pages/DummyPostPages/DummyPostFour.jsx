import { Comment } from "../../components/CommentClass";
import { Navbar, PostContent, CommentSection } from "../../components";
import { use, useEffect, useState } from "react";

import picture from "../../sampleImages/madison_square.png";

export default function DummyPostFour() {
   {
      /** Sample Info */
   }
   let username = "KnicksFaithful";
   let datePostCreated = "10/01/2025";
   let timePostCreated = "45 Minutes";
   let caption =
      "Madison Square Garden — where the Knicks reminded us what heart and hustle look like. Last season wasn’t just progress, it was pride. 🗽🏀🔥";

   const [commentsList, changeCommentListState] = useState([
      new Comment(
         "1",
         "MSG was electric all season. You could *feel* the energy through the screen.",
         "blueAndOrangeSoul",
         "02/10/2025",
         29,
         true
      ),
      new Comment(
         "2",
         "Jalen Brunson really proved he’s *that* guy. What a leader.",
         "nycBuckets",
         "02/10/2025",
         34,
         false
      ),
      new Comment(
         "3",
         "Haven’t felt this proud to be a Knicks fan in years. The culture shift is real.",
         "loyalSince98",
         "03/10/2025",
         22,
         true
      ),
      new Comment(
         "4",
         "Playoff atmosphere at the Garden hits different. No other arena like it.",
         "msgSeasonTix",
         "03/10/2025",
         18,
         false
      ),
      new Comment(
         "5",
         "Still thinking about that OT win against Boston. What a game!",
         "clutchTalks",
         "04/10/2025",
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
         <Navbar></Navbar>
         <PostContent
            img={picture}
            username={username}
            date={datePostCreated}
            time={timePostCreated}
            caption={caption}
            likeCount={likeCount}
            likeButtonFunc={updatePostLikeCount}
            likeStatus={likedPostState}
         ></PostContent>
         <CommentSection
            addComment={addCommentToList}
            commentsList={commentsList}
         ></CommentSection>
      </div>
   );
}
