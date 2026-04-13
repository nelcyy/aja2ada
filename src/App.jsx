import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './login/index.jsx'
import TwoFAPage from './2fa/index.jsx'
import RegisterPage from './register/register.jsx'
<<<<<<< HEAD
import HomePage from './home/index.jsx'
=======
import WishlistPage from './wishlist/wishlist.jsx'
>>>>>>> 1238e804f06f1c0159623d4bc950fab0dfb223ee

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/2fa" element={<TwoFAPage />} />
<<<<<<< HEAD
        <Route path="/" element={<HomePage />} />
=======
        <Route path="/wishlist" element={<WishlistPage />} />
>>>>>>> 1238e804f06f1c0159623d4bc950fab0dfb223ee
      </Routes>
    </Router>
  )
}

export default App
