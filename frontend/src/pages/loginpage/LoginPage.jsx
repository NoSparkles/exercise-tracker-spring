import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import './loginpage.css';
import { Link, useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { UserContext } from '../../App';
import useInput from '../../hooks/useInput';
import UserService from '../../services/UserService';
import Toast from '../../components/Toast';

const LoginPage = () => {
  const [user, loading, authenticated] = useUser();
  const [email, emailOnChange] = useInput("");
  const [password, passwordOnChange] = useInput("");
  const [showToast, setShowToast] = useState(false)
  const [toastText, setToastText] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.length < 5) {
      setToastText("email is too short")
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 2000);
    }
    else {
      UserService.login(email, password).then((success) => {
      if (success) {
        navigate('/')
      }
      else {
        setToastText("Credentials are not correct")
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
      } 
    })
    }
  }

  return (
    <UserContext.Provider value={[user, loading, authenticated]}>
      {
        showToast ? <Toast text={toastText}/> : <></>
      }
      
      <Navbar />
      <div className="login-page">
        <div className="circles">
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <h1>Welcome Back</h1>
          <p>Please log in to continue tracking your fitness journey.</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                value={email}
                required
                onChange={emailOnChange}
              />
              <label>Email</label>
            </div>
            <div className="input-group">
              <input
                type="password"
                value={password}
                required
                onChange={passwordOnChange}
              />
              <label>Password</label>
            </div>
            <button type="submit" className="login-button">
              Log In
            </button>
            <p>
              Don't have an account? <Link to='/signup'>Create one!</Link>
            </p>
          </form>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default LoginPage;
