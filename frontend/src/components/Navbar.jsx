import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [links, setLinks] = useState((
    <>
      <Link to='/login'>Log in</Link>
      <Link to='/signup'>Sign up</Link>
    </>
  ));

  useEffect(() => {
    UserService.isLoggedIn().then(requiresReLogin => {
      if (requiresReLogin) {
        setIsLoggedIn(false);
      } else {
        UserService.me().then(([userData, userError, relogin]) => {
          if (relogin) {
            setIsLoggedIn(false);
          } else if (!userError) {
            setIsLoggedIn(true);
            setLinks((
              <>
                <Link to='/exercises'>Exercises</Link>
                <Link to='/profile' className='profile-link'>Welcome, {userData.fullName}!</Link>
              </>
            ));
          }
        });
      }
    });
  }, []);

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
