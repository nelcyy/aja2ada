import React from "react";
import "./register.css";

export default function Register() {
  return (
    <div className="page">
      <div className="wrapper">
        <img src="/logo-careofyou.png" alt="logo" className="logo" />

        <div className="form">
          <input type="text" placeholder="Name" className="input" />
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <input type="password" placeholder="Confirm Password" className="input" />

          <button className="btn">Register</button>
        </div>

        <p className="back">Back to Login</p>
      </div>
    </div>
  );
}