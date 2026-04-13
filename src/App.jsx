import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './login/index.jsx'
import TwoFAPage from './2fa/index.jsx'
import RegisterPage from './register/register.jsx'
import WishlistPage from './wishlist/wishlist.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/2fa" element={<TwoFAPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </Router>
  )
}

export default App
