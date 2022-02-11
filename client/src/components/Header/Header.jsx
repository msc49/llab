import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css';

const Header = () => {
  return (
    <div className="header ui secondary pointing menu">
      <Link to='/' className='logo item'>
        SIGN UP
      </Link>
      <Link to='/login' className='logo item'>
        LOG IN
      </Link>
      <Link to='/items' className='item'>
        ITEMS
      </Link>
    </div>
  )
} 

export default Header;