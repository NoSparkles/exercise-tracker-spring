import React from 'react'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'
import './homepage.css'
import useUser from '../../hooks/useUser'
import { UserContext } from '../../App'

const HomePage = () => {
  const [user, loading, authenticated] = useUser()
  return (
    <UserContext.Provider value={[user, loading, authenticated]}>
      <Navbar/>
      <div className='home-page'>
        <div className='circles'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="glass">
          <section className='hero'>
            <div className="left">
              <h1>Welcome to Exercise Tracker!</h1>
              <h2>Track Your Progress. Reach Your Goals.</h2>
            </div>
            <div className="right">
              <p>Your journey to a healthier, stronger starts here. Exercise Tracker is your personal fitness companion, designed to help you track every workout, monitor your progress, and stay motivated on your path to achieving your fitness goals.</p>
            </div>
          </section>
          <section className='why-choose-us'>
            <h1>Why choose us?</h1>
            <ul>
              <li>
                <span>Easy Tracking: </span>Record your workouts with just a few clicks. Whether it's running, lifting, yoga, or any other activity, we've got you covered.
              </li>
              <li>
                <span>Visualize Your Progress: </span>View your results over time with clear, detailed graphs and charts. Celebrate your milestones and see how far you've come.
              </li>
              <li>
                <span>Set Goals & Achieve Them: </span>Create personalized fitness goals and let us help you stay on track. Push yourself to new limits and watch your progress unfold.
              </li>
              <li>
                <span>Community & Support: </span>Join a community of like-minded fitness enthusiasts. Share your progress, exchange tips, and motivate each other to keep going.
              </li>
            </ul>
          </section>
          {
            !loading && !authenticated && (
              <section className='get-started'>
                <h1>Get Started</h1>
                <div className='content'>
                  <p>Sign up today and take the first step towards a healthier lifestyle. Already have an account? Log in and see how you're doing.</p>
                  <Link to='signup'>Sign up</Link>
                </div>
              </section>
            )
          }
          
        </div>
      </div>
    </UserContext.Provider>
  )
}

export default HomePage