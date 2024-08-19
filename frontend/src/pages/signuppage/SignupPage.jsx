import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import './signuppage.css'
import { UserContext } from '../../App'
import useUser from '../../hooks/useUser'
import useInput from '../../hooks/useInput'
import UserService from '../../services/UserService'
import Toast from '../../components/Toast'

const SignupPage = () => {
  const [user, loading, authenticated] = useUser()
  const [fullName, fullNameOnChange] = useInput("")
  const [email, emailOnChange] = useInput("")
  const [password, passwordOnChange] = useInput("")
  const [repeatPassword, repeatPasswordOnChange] = useInput("")
  const [showToast, setShowToast] = useState(false)
  const [toastText, setToastText] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (fullName.length < 5) {
      setToastText("Full name is too short")
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 2000);
    }
    else if (email.length < 5) {
      setToastText("email is too short")
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 2000);
    }
    else if (password !== repeatPassword) {
      setToastText("passwords does not match")
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 2000);
    }
    else {
      UserService.create(email, password, fullName)
      .then(success => {
        if (success) {
          UserService.login(email, password).then((loginSuccess) => {
            if (loginSuccess) {
              navigate('/')
            }
            else {
              setToastText("something went wrong")
              setShowToast(true)
              setTimeout(() => {
                setShowToast(false)
              }, 2000);
            }
          })
        }
        else {
          setToastText("User with this email already exists")
          setShowToast(true)
          setTimeout(() => {
            setShowToast(false)
          }, 2000);
        }
      })
    }
  }
  useEffect(() => {
    console.log({email, fullName, password, repeatPassword})
  })

  return (
    <UserContext.Provider value={[user, loading, authenticated]}>
      {
        showToast ? <Toast text={toastText}/> : <></>
      }
      <Navbar></Navbar>
      <div className="signup-page">
        <div className="circles">
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <h1>Create account</h1>
          <p>Please fill in the form to create an account.</p>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" required value={fullName} onChange={fullNameOnChange}/>
              <label>Full Name</label>
            </div>
            <div className="input-group">
              <input type="text" required value={email} onChange={emailOnChange}/>
              <label>Email</label>
            </div>
            <div className="input-group">
              <input type="password" required value={password} onChange={passwordOnChange}/>
              <label>Password</label>
            </div>
            <div className="input-group">
              <input type="password" required value={repeatPassword} onChange={repeatPasswordOnChange}/>
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