import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Navbar } from "../components";

export default function MainPage() {
   const navigate = useNavigate();
   return (
      <div>
         <Navbar />
         <h1>Main Page</h1>
         <Button
            title="Go to post 1"
            func={() => {
               navigate("/post/1");
            }}
         ></Button>
         <Button
            title="Go to post 2"
            func={() => {
               navigate("/post/2");
            }}
         ></Button>
         <Button
            title="Go to post 3"
            func={() => {
               navigate("/post/3");
            }}
         ></Button>
         <Button
            title="Go to post 4"
            func={() => {
               navigate("/post/4");
            }}
         ></Button>
         <Button
            title="Go to post 5"
            func={() => {
               navigate("/post/5");
            }}
         ></Button>
         <Button
            title="Go to post 6"
            func={() => {
               navigate("/post/6");
            }}
         ></Button>
      </div>
   );
}
