import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./index.css"
import HomePage from './pages/homepage/HomePage'
import LoginPage from './pages/loginpage/LoginPage'
import SignupPage from './pages/signuppage/SignupPage'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={HomePage}/>
        <Route path='login' Component={LoginPage}/>
        <Route path='signup' Component={SignupPage}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
