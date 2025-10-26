{
   /** Component to Organize Post Content
    * Props:
    *    img:                 Image of the post
    *    username:            Username of person who created the post
    *    date:                Date post was created
    *    time:                How long ago the post was created
    *    caption:             Caption of the post
    *    likeCount:           Like count of post
    *    likeStatus:          Whether current user has liked the current post
    *    likeButtonFunc:      Callback function to send request to like/unlike the post
    */
}
export default function PostContent(props) {
   return (
      <div className="card bg-base-100 w-96 shadow-sm">
         <figure>{<img src={props.img} />}</figure>
         <div className="card-body">
            <h2 className="card-title">{props.username}</h2>
            <p className="text-opacity-50 text-gray-50 text-[15px]">
               {props.date}
            </p>
            <p className="text-opacity-50 text-gray-50 text-[15px]">
               {props.time} ago
            </p>
            <p>{props.caption}</p>
            <div className="card-actions justify-center">
               <button
                  className="btn btn-square btn-ghost"
                  onClick={props.likeButtonFunc}
               >
                  <svg
                     className="size-[5em]"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                  >
                     <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                        fill={props.likeStatus ? "red" : "none"}
                        stroke="currentColor"
                     >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                     </g>
                  </svg>
               </button>
               <div className="badge badge-outline">{props.likeCount}</div>
            </div>
         </div>
      </div>
   );
}
