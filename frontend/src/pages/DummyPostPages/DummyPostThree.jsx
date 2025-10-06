import {
   PostHeading,
   PostCaption,
   PostImage,
   PostInformation,
   Comment,
   CommentSectionHeader,
   CommentBlock,
} from "../../components/PostComponents";

import picture from "../../sampleImages/basketball.png";

import { use, useEffect, useState } from "react";

export default function DummyPostThree() {
   {
      /** Sample Info */
   }
   let username = "HoopsInTheCity";
   let datePostCreated = "9/28/2025";
   let timePostCreated = "30 Minutes";
   let caption =
      "Cracked pavement, chain nets, and the sound of sneakers squeaking on concrete — this is where legends are born. NYC street courts are more than just places to play; they're battlegrounds, community hubs, and open-air arenas filled with raw talent and heart. Whether you're watching a pickup game in Harlem or catching the sunset over a Lower East Side court, there's nothing quite like New York City basketball. 🏀🗽🔥";

   const [commentsList, changeCommentListState] = useState([
      new Comment(
         "1",
         "This court brings back memories! I used to play here every summer growing up.",
         "BKballer91",
         "29/09/2025",
         36,
         true
      ),
      new Comment(
         "2",
         "That chain net swish sound hits different. Pure streetball vibes.",
         "netSnapper",
         "30/09/2025",
         28,
         false
      ),
      new Comment(
         "3",
         "If you haven’t hooped in NYC, have you even hooped at all?",
         "courtKing23",
         "30/09/2025",
         22,
         true
      ),
      new Comment(
         "4",
         "Caught a game here last week — the intensity was wild. Real passion.",
         "gameWatcher",
         "30/09/2025",
         19,
         false
      ),
      new Comment(
         "5",
         "It’s the energy for me. Every court has its own soul in this city.",
         "cityPulse",
         "01/10/2025",
         25,
         true
      ),
      new Comment(
         "6",
         "One-on-one after school, no refs, just pride and grit.",
         "streetLegend",
         "01/10/2025",
         14,
         false
      ),
      new Comment(
         "7",
         "You never know who you’ll run into at these courts. Could be future NBA.",
         "talentScoutNY",
         "02/10/2025",
         31,
         true
      ),
      new Comment(
         "8",
         "Played pickup here last summer. Got dunked on and earned respect. 😂",
         "ballDontLie",
         "02/10/2025",
         44,
         false
      ),
      new Comment(
         "9",
         "Street hoops are raw and real. No fancy gym, just love for the game.",
         "trueToTheGame",
         "03/10/2025",
         20,
         true
      ),
      new Comment(
         "10",
         "The golden hour lighting on that court is 🔥. So cinematic.",
         "lensOnTheStreets",
         "03/10/2025",
         27,
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
