import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewUserPage from "./pages/SignUpPage";
import ChooseUserTypePage from "./pages/ChooseUserType";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import UserProfile from "./pages/UserProfile";
import UserSettings from "./pages/UserSettings";
import SignUpPage from "./pages/SignUpPage";

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
