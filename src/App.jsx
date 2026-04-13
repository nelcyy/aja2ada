import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './login/index.jsx'
import TwoFAPage from './2fa/index.jsx'
import RegisterPage from './register/register.jsx'
import MyProfilePage from './myprofile/index.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/2fa" element={<TwoFAPage />} />
        <Route path="/myprofile" element={<MyProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App
