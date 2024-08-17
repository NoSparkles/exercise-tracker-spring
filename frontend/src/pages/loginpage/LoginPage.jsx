import React from 'react'
import Navbar from '../../components/Navbar'
import './loginpage.css'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="login-page">
        <div className="circles">
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <h1>Welcome Back</h1>
          <p>Please log in to continue tracking your fitness journey.</p>
          <form className="login-form">
            <div className="input-group">
              <input type="text" required />
              <label>Email</label>
            </div>
            <div className="input-group">
              <input type="password" required />
              <label>Password</label>
            </div>
            <button type="submit" className="login-button">Log In</button>
            <p>Don't have an account? <Link to='/signup'>Create one!</Link></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginPage