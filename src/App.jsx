import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthPage from './auth/index.jsx'
import TwoFAPage from './2fa/index.jsx'
import MyProfilePage from './myprofile/index.jsx'
import HomePage from './home/index.jsx'
import WishlistPage from './wishlist/wishlist.jsx'
<<<<<<< HEAD
=======
import CheckoutPage from './checkout/index.jsx'
>>>>>>> 3d6d54a1d5a9ce21202c8d1cfc4a4b9ab3f1e61b

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/2fa" element={<TwoFAPage />} />
        <Route path="/myprofile" element={<MyProfilePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  )
}

export default App
