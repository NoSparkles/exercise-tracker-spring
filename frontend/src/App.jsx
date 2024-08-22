import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./index.css"
import HomePage from './pages/homepage/HomePage'
import LoginPage from './pages/loginpage/LoginPage'
import SignupPage from './pages/signuppage/SignupPage'
import ExercisesPage from './pages/exercisespage/ExercisesPage'
import ExercisePage from './pages/exercisepage/ExercisePage'

export const UserContext = React.createContext(null)

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={HomePage}/>
          <Route path='login' Component={LoginPage}/>
          <Route path='signup' Component={SignupPage}/>
          <Route path='exercises' Component={ExercisesPage}/>
          <Route path='exercises/:id' Component={ExercisePage}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
