import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NewUserPage from './pages/NewUserPage'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import PostPage from './pages/PostPage'
import UserProfile from './pages/UserProfile'
import UserSettings from './pages/UserSettings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<NewUserPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/settings" element={<UserSettings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App