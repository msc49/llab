import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css';

const Header = ({setSession}) => {

  const signOut = () => {
    localStorage.removeItem('user')
    setSession(false)
  }

  return (
    <div className="header ui secondary pointing menu">
      {/* <Link to='/items' className='item'>
        ITEMS
      </Link> */}
      <div className="logo item">
        <p className="blue" href="#" onClick={signOut}>Sign Out</p>
      </div>
     
    </div>
  )
} 

export default Header;