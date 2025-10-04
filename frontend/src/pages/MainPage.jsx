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
      </div>
   );
}
