import { Comment } from "../../components/CommentClass";
import { Navbar, PostContent, CommentSection } from "../../components";
import { use, useEffect, useState } from "react";

import picture from "../../sampleImages/italian.png";

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
         "25",
         "This thread is more dramatic than the tiramisu reveal.",
         "lurkingLinguini",
         "05/23/2025",
         14,
         false
      ),
      new Comment(
         "5",
         "Went in skeptical, walked out planning my next reservation. That’s how good it was.",
         "forkYeahNYC",
         "05/19/2025",
         31,
         false
      ),
      new Comment(
         "24",
         "I think y’all are confusing atmosphere with quality.",
         "ambienceIsntTaste",
         "05/16/2025",
         19,
         true
      ),
      new Comment(
         "4",
         "Sat at the chef’s counter — incredible experience. You could taste the effort.",
         "openKitchenFan",
         "05/12/2025",
         15,
         false
      ),
      new Comment(
         "23",
         "Okay but the panna cotta? PERFECTION.",
         "dessertedMe",
         "05/09/2025",
         23,
         false
      ),
      new Comment(
         "3",
         "People just love to complain. This place nailed it from apps to dessert.",
         "noComplaintsClub",
         "05/05/2025",
         24,
         false
      ),
      new Comment(
         "22",
         "Went twice. First time amazing, second time… meh. Inconsistent.",
         "roundTwoReview",
         "05/01/2025",
         17,
         true
      ),
      new Comment(
         "21",
         "It’s not gatekeeping to call bad food bad. Period.",
         "spicyOpinion",
         "04/28/2025",
         13,
         true
      ),
      new Comment(
         "2",
         "I had the same experience — cozy, classy, and the wine pairing was on point.",
         "vinoVeritas",
         "04/24/2025",
         19,
         false
      ),
      new Comment(
         "20",
         "We all have different palates. Let's not gatekeep taste buds.",
         "flavorMediator",
         "04/21/2025",
         8,
         false
      ),
      new Comment(
         "19",
         "Fair point. But mine *was* hot and timely. Maybe just unlucky?",
         "diplomaticDish",
         "04/17/2025",
         9,
         false
      ),
      new Comment(
         "1",
         "Thank you! I thought the same thing. That truffle ravioli was next-level.",
         "pastaislife",
         "04/13/2025",
         28,
         false
      ),
      new Comment(
         "18",
         "We get it, you're a foodie. Some of us want food that's hot and timely.",
         "realityEater",
         "04/10/2025",
         15,
         true
      ),
      new Comment(
         "17",
         "Mid? I nearly cried eating that carbonara. Unreal.",
         "pastadrenaline",
         "04/06/2025",
         20,
         false
      ),
      new Comment(
         "16",
         "Honestly, it was mid. Nothing terrible, just not worth the hype.",
         "balancedBite",
         "04/02/2025",
         12,
         true
      ),
      new Comment(
         "15",
         "Have you even had real Italian food? Because this was close.",
         "romeOnMyMind",
         "03/29/2025",
         10,
         false
      ),
      new Comment(
         "14",
         "Can’t believe people are defending this place. Absolute letdown.",
         "expectBetter",
         "03/25/2025",
         14,
         true
      ),
      new Comment(
         "13",
         "The truffle aroma hit before the plate even landed. Amazing.",
         "bitesAndBougie",
         "03/21/2025",
         18,
         false
      ),
      new Comment(
         "12",
         "LOL people expecting Olive Garden prices at a fine dining spot.",
         "snobbySauce",
         "03/17/2025",
         16,
         false
      ),
      new Comment(
         "11",
         "Tasted like something from a frozen dinner box. Not impressed.",
         "microwaveGourmet",
         "03/14/2025",
         22,
         true
      ),
      new Comment(
         "10",
         "You waited because it's popular. Good food takes time.",
         "defNotAChef",
         "03/10/2025",
         13,
         false
      ),
      new Comment(
         "9",
         "Service was a disaster. Took 40 minutes for our appetizer.",
         "waited4ever",
         "03/06/2025",
         9,
         true
      ),
      new Comment(
         "8",
         "I thought it was charming and authentic. Some people just want to complain.",
         "italianSoul",
         "03/02/2025",
         21,
         false
      ),
      new Comment(
         "7",
         "If you call bland pasta and soggy breadsticks 'next-level,' sure.",
         "chefBoyarNo",
         "03/01/2025",
         17,
         true
      ),
      new Comment(
         "6",
         "Overpriced and overhyped. You’re paying for the name, not the food.",
         "realTalkRita",
         "03/01/2025",
         11,
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
