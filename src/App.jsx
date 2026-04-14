import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthPage from './auth/index.jsx'
import TwoFAPage from './2fa/index.jsx'
import MyProfilePage from './myprofile/index.jsx'
import HomePage from './home/index.jsx'
import WishlistPage from './wishlist/wishlist.jsx'
import ContactPage from './contact/index.jsx'
import CheckoutPage from './checkout/index.jsx'
import { CartProvider } from './context/CartContext.jsx'
import CartSidebar from './components/CartSidebar.jsx'

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/2fa" element={<TwoFAPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/myprofile" element={<MyProfilePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        <CartSidebar />
      </Router>
    </CartProvider>
  )
}

export default App
