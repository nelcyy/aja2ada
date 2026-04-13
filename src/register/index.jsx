import React from 'react'
import { Link } from 'react-router-dom'

function RegisterPage() {
  return (
    <div>
      <h1>Register Page</h1>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" placeholder="Enter your name" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Sudah punya akun? <Link to="/">Login di sini</Link>
      </p>
    </div>
  )
}

export default RegisterPage;
