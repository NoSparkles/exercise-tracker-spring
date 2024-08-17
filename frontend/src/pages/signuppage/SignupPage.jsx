import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import './signuppage.css'
import { UserContext } from '../../App'
import useUser from '../../hooks/useUser'

const SignupPage = () => {
  const [user, loading, authenticated] = useUser()
  return (
    <UserContext.Provider value={[user, loading, authenticated]}>
      <Navbar></Navbar>
      <div className="signup-page">
        <div className="circles">
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <h1>Create account</h1>
          <p>Please fill in the form to create an account.</p>
          <form className="signup-form">
            <div className="input-group">
              <input type="text" required />
              <label>Email</label>
            </div>
            <div className="input-group">
              <input type="password" required />
              <label>Password</label>
            </div>
            <div className="input-group">
              <input type="password" required />
              <label>Repeat password</label>
            </div>
            <button type="submit" className="signup-button">Sign Up</button>
            <p>Already have an account? <Link to='/login'>Log in!</Link></p>
          </form>
        </div>
      </div>
    </UserContext.Provider>
  )
}

export default SignupPage