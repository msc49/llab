import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css';

const Header = ({setSession}) => {

  const signOut = () => {
    localStorage.removeItem('user')
    setSession(false)
  }

  return (
    <div className="ui borderless top massive menu">

      <Link to='/items' className="item">
        Local Lab
      </Link>

      <div className='right menu'>

        <div className="item">
          <div class="ui left green icon label">
            <i class="dove icon"></i>
            8
          </div>
          <div class="ui left blue icon label">
            <i class="gift icon"></i>
            6
          </div>
        </div>
  
        <Link to='/profile' className="item">
          <img src="https://fomantic-ui.com/images/avatar/small/elliot.jpg" className="ui mini circular image" alt=""/>
        </Link>

       
      
        <div className="item" onClick={signOut}>
          Sign Out
        </div>
      </div>
    
    </div>
  )
} 

export default Header;