import React from 'react';
import { Link } from 'react-router-dom'
import UserLogIn from '../Users/LogIn';

import './Header.css';

const Header = ({setSession}) => {

  const signOut = () => {
    localStorage.removeItem('user')
    setSession(false)
  }

  const userDetails = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="header ui secondary pointing menu">
        
      <div className="nav-item">
      <Link to='/home' className='nav-item'>
         Local Lab Logo
      </Link> 
      </div> 

      <div className="nav-item">
        <p className="blue" href="#" onClick={signOut}>Sign Out</p>
      </div>

      <div className="nav-item profile">
      <Link to='/profile' className='nav-item'>
        Hi, {userDetails.user.name}!
      </Link>
      </div>
     
    </div>


  )
} 

export default Header;