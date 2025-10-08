import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components";

function ImgTile(props) {
   const img = props.img;
   const postID = props.postID;
   return (
      <div>
         <button onClick={props.func}>
            <img src={img} alt="image" />
         </button>
      </div>
   );
}

export default function UserProfile() {
   const navigate = useNavigate();
   // temp data
   const tree = "../../sampleImages/post_tree.png";
   const sample = [
      { postID: "tree-1", img: tree },
      { postID: "tree-2", img: tree },
      { postID: "tree-3", img: tree },
      { postID: "tree-4", img: tree },
      { postID: "tree-5", img: tree },
      { postID: "tree-6", img: tree },
      { postID: "tree-7", img: tree },
      { postID: "tree-8", img: tree },
      { postID: "tree-9", img: tree },
      { postID: "tree-10", img: tree },
   ];

   const username = "LeafyExcitement";

   return (
      <div>
         <Navbar></Navbar>

         <h3>{username}</h3>
         <br />
         <br />
         <div className="grid grid-cols-3 grid-rows-3 gap-x-0 gap-y-20">
            {sample.map((current) => {
               return (
                  <ImgTile
                     img={current.img}
                     postID={current.postID}
                     key={current.postID}
                     func={() => {
                        navigate(`/post/1`);
                     }}
                  ></ImgTile>
               );
            })}
         </div>
      </div>
   );
}
