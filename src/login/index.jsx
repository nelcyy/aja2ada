import React from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email WOIII" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </div>
  )
}

export default LoginPage;
