import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {
  const [user, loading, authenticated] = useContext(UserContext)
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
    setLinks(<>
    <Link to='/exercises'>Exercises</Link>
      <Link to='/profile'>Welcome, {user.fullName}!</Link>
    </>)
  }, [loading]);

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
