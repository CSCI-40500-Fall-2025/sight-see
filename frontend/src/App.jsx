import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/UserAuth/SignUpPage";
import ChooseUserTypePage from "./pages/UserAuth/ChooseUserType";
import LoginPage from "./pages/UserAuth/LoginPage";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import UserProfile from "./pages/UserProfile";
import UserSettings from "./pages/UserSettings";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<ChooseUserTypePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="/settings" element={<UserSettings />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
