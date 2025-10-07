import { Comment } from "../../components/CommentClass";
import { Navbar, PostContent, CommentSection } from "../../components";
import { use, useEffect, useState } from "react";

import treePic from "../../sampleImages/post_tree.png";

export default function DummyPostOne() {
   {
      /** Sample Info */
   }
   let username = "LeafyExcitement";
   let datePostCreated = "8/20/2025";
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
         <Navbar></Navbar>
         <PostContent
            img={treePic}
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
