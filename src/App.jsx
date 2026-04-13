import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './login/index.jsx'
import TwoFAPage from './2fa/index.jsx'
import RegisterPage from './register/register.jsx'
<<<<<<< HEAD
import MyProfilePage from './myprofile/index.jsx'

=======
import HomePage from './home/index.jsx'
import WishlistPage from './wishlist/wishlist.jsx'
>>>>>>> d7bd9d916c9f3e16a13d9d57cd3f0f5e16085bd6
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/2fa" element={<TwoFAPage />} />
<<<<<<< HEAD
        <Route path="/myprofile" element={<MyProfilePage />} />
=======
        <Route path="/" element={<HomePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
>>>>>>> d7bd9d916c9f3e16a13d9d57cd3f0f5e16085bd6
      </Routes>
    </Router>
  )
}

export default App
