import { use, useEffect, useState } from "react";
import treePic from "../sampleImages/post_tree.png";
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
   const sample = [
      { postID: "tree-1", img: treePic },
      { postID: "tree-2", img: treePic },
      { postID: "tree-3", img: treePic },
      { postID: "tree-4", img: treePic },
      { postID: "tree-5", img: treePic },
      { postID: "tree-6", img: treePic },
      { postID: "tree-7", img: treePic },
      { postID: "tree-8", img: treePic },
      { postID: "tree-9", img: treePic },
      { postID: "tree-10", img: treePic },
   ];

   return (
      <div>
         <Navbar></Navbar>

         <h3>*Username here*</h3>
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
                        navigate(`/post/${current.postID}`);
                     }}
                  ></ImgTile>
               );
            })}
         </div>
      </div>
   );
}
