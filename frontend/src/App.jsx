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

import DummyPostOne from "./pages/DummyPostPages/DummyPostOne";
import DummyPostTwo from "./pages/DummyPostPages/DummyPostTwo";
import DummyPostThree from "./pages/DummyPostPages/DummyPostThree";
import DummyPostFour from "./pages/DummyPostPages/DummyPostFour";
import DummyPostFive from "./pages/DummyPostPages/DummyPostFive";
import DummyPostSix from "./pages/DummyPostPages/DummyPostSix";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<ChooseUserTypePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/main" element={<MainPage />} />
            {/**<Route path="/post" element={<PostPage />} /> */}
            <Route path="/post/tree" element={<DummyPostOne />} />
            <Route path="/post/1" element={<DummyPostOne />} />
            <Route path="/post/2" element={<DummyPostTwo />} />
            <Route path="/post/3" element={<DummyPostThree />} />
            <Route path="/post/4" element={<DummyPostFour />} />
            <Route path="/post/5" element={<DummyPostFive />} />
            <Route path="/post/6" element={<DummyPostSix />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/settings" element={<UserSettings />} />

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
