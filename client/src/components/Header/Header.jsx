import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css';

const Header = () => {
  return (
    <div className="header ui secondary pointing menu">
      <Link to='/' className='logo item'>
        LOCAL LAB
      </Link>
      <Link to='/items' className='item'>
        Search Items
      </Link>
    </div>
  )
} 

export default Header;