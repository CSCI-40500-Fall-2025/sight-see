import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/UserAuth/SignUpPage";
import ChooseUserTypePage from "./pages/UserAuth/ChooseUserType";
import LoginPage from "./pages/UserAuth/LoginPage";
import MainPage from "./pages/MainPage";
import UserProfile from "./pages/UserProfile";
import UserSettings from "./pages/UserSettings";

import ChangeProfilePicture from "./pages/SettingPages/ChangeProfilePic";
import ChangePassword from "./pages/SettingPages/ChangePassWord";
import ChangeUsername from "./pages/SettingPages/ChangeUsername";
import ChangeEmail from "./pages/SettingPages/ChangeEmail";

import PostPage from "./pages/PostPage";
import CreatePostPage from "./pages/CreatePostPage";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<ChooseUserTypePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/post/:postID" element={<PostPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/createpost" element={<CreatePostPage />} />

            <Route path="/settings" element={<UserSettings />} />
            <Route
               path="/settings/changeProfilePicture"
               element={<ChangeProfilePicture />}
            />
            <Route
               path="/settings/changePassword"
               element={<ChangePassword />}
            />
            <Route
               path="/settings/changeUsername"
               element={<ChangeUsername />}
            />
            <Route path="/settings/changeEmail" element={<ChangeEmail />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
