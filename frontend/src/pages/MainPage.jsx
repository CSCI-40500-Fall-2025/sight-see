import { useNavigate } from "react-router-dom";

export default function MainPage() {
   const postId = "sample";
   let navigate = useNavigate();

   function buttonClick(postId) {
      navigate(`/post/${postId}`);
   }

   return (
      <div>
         <h1>Main Page</h1>
         {
            // Temp button to go to post
         }
         <button onClick={() => buttonClick(postId)}>Go to post</button>
      </div>
   );
}
