import React from 'react';
import { Link } from 'react-router-dom'

import './Header.css';

const Header = ({setSession}) => {

  const signOut = () => {
    localStorage.removeItem('user')
    setSession(false)
  }

  const userDetails = JSON.parse(localStorage.getItem('user')) 

  return (
    <div className="header ui secondary pointing menu">

      <Link to='/' className='nav-item'>
          Local Lab Logo
      </Link>

      <div className="nav-item">
        <p className="blue" href="#" onClick={signOut}>Sign Out</p>
      </div>
      
      {userDetails &&
           <div className="nav-item profile">
           <Link to='/profile' className='nav-item'>
             Hi, {userDetails.user.name}!
           </Link>
           </div>
        }
 
    </div>


  )
} 

export default Header;