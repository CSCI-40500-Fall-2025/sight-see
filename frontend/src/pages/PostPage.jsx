import { Comment } from "../components/CommentClass";
import { Navbar, PostContent, CommentSection } from "../components";
import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DummyPostInformation } from "./DummyPostInformation";

export default function PostPage() {
   {
      /** Get and organize sample info */
   }
   const { postID } = useParams();
   let postInformation = DummyPostInformation.find(
      (post) => post.id === postID
   );
   const username = postInformation.username;
   const userID = postInformation.userId;
   const datePostCreated = postInformation.dateCreated;
   const timePostCreated = postInformation.timeCreated;
   const picture = postInformation.picture;
   const caption = postInformation.caption;

   const [likedPostState, changeLikedPostState] = useState(
      postInformation.postLikeState
   );
   const [likeCount, changeLikeCountState] = useState(postInformation.likes);
   const [commentsList, changeCommentListState] = useState(
      postInformation.comments
   );

   const location = postInformation.location;

   // TEMPORARY
   const [commentsListIndex, changeCommentsListIndexState] = useState(100);

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
