import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {
  const [user, loading, authenticated, logout] = useContext(UserContext)
  console.log(logout)
  const [links, setLinks] = useState((
    <>
      <p style={{color: "white"}}>Loading...</p>
    </>
  ));

  useEffect(() => {
    if (loading) {
      return
    }
    if (!authenticated) {
      setLinks(<>
        <Link to='/login'>Log in</Link>
        <Link to='/signup'>Sign up</Link>
      </>)
      return 
    }
    setLinks(
      <>
        <Link to='/exercises'>Exercises</Link>
        <div className="user">
          <span>Welcome, {user.fullName}!</span>
          <button onClick={logout}>Logout</button>
        </div>
      </>)
  }, [loading, authenticated]);

  return (
    <div className='navbar'>
      <div className='home-link'>
        <Link to='/'>Home</Link>
      </div>
      <div className='links'>
        {links}
      </div>
    </div>
  );
};

export default Navbar;
