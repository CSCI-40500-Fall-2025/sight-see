import { Comment } from "../components/CommentClass";
import { Navbar, PostContent, CommentSection } from "../components";
import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DummyPostInformation } from "./DummyPostInformation";
import api from "../axiosConfig";

export default function PostPage() {
   const { postID } = useParams();

   useEffect(() => {
      getPostInfo();
   }, []);

   const getPostInfo = async () => {
      try {
         const response = await api.get(`/posts/${postID}`);

         if (response.status === 200) {
            // Fill in the information
            const postInformation = response.data;

            // Convert byte array to base64 image string
            const pictureBase64 = byteArrayToBase64(postInformation.postImage);

            // Fill in the state with the fetched post data
            setUsername(postInformation.username);
            setUserID(postInformation.userId);

            setPicture(pictureBase64);
            setCaption(postInformation.caption);

            setLocation(postInformation.locationCoordinates);

            setDatePostCreated("08/20/2025");
            setTimePostCreated("5 Minutes ago");

            setLoading(false);
            console.log("done");
         }
      } catch (error) {
         console.log(error);
      }
   };

   const [username, setUsername] = useState("");
   const [userID, setUserID] = useState("");
   const [datePostCreated, setDatePostCreated] = useState("");
   const [timePostCreated, setTimePostCreated] = useState("");
   const [picture, setPicture] = useState("");
   const [caption, setCaption] = useState("");
   const [location, setLocation] = useState(null);

   const [loading, setLoading] = useState(true);

   const [likedPostState, changeLikedPostState] = useState(true);
   const [likeCount, changeLikeCountState] = useState(1);
   const [commentsList, changeCommentListState] = useState([]);

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
         "LeafyExcitement",
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
         {loading ? (
            <span className="loading loading-spinner loading-xl"></span>
         ) : (
            <>
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
            </>
         )}
      </div>
   );
}
