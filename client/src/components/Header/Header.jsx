import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css';

const Header = ({session, setSession}) => {

  console.log(session)

  const signOut = () => {
    localStorage.removeItem('user')
    setSession(false)
  }

  if(session) {
    return (
      <div className="ui borderless top massive menu">
        <Link to='/' className="item">
          Local Lab
        </Link>
        
        <div className='right menu'>

          <div className="item">
            <div className="ui inline simple dropdown">

              <div className="text">
                <img className="ui avatar image" src="https://fomantic-ui.com/images/avatar/small/elliot.jpg" alt=""/>
                {session.user.username}
              </div>

              <div className="menu">

                <div className="item">
                  <i className="bell icon"></i>
                  Notifications
                </div>

                <div className="item">
                  <i className="user circle outline icon"></i>
                  Profile
                </div>

                <div className="item">
                  <i className="cog icon"></i>
                  Settings
                </div>
                
                <div className="item">
                <i className="comment alternate outline icon"></i>
                  Chat
                </div>

                <div className="item">
                  <i className="question circle outline icon"></i>
                  Help
                </div>

                <div className="item" onClick={signOut}>
                  <span className='ui blue text'>Sign Out</span>
                </div>

              </div>

            </div>
          </div>
       
        </div>  
      </div>
    )
  } else {
    return (
      <div className="ui borderless top massive menu">
        <Link to='/' className="item">
          Local Lab
        </Link>

        <div className='right menu'>
{/* optional */}
          {/* <div className="item">
            <div className="ui mini statistics">

              <div className="statistic">
                <div className="value">
                  <span className='ui small green text'>
                    <i className="hand holding heart icon"></i> 
                    200K
                  </span>
                </div>
                <div className="label">
                  <span className='ui small text'>Lenders</span>
                </div>

              </div>

              <div className="statistic">
                <div className="value">
                  <span className='ui small blue text'><i class="gift icon"></i> 2.3M</span>
                </div>
             
                <div className="label">
                  <span className='ui small text'>Items</span>
                </div>
              </div>

            </div>
          </div> */}
          {/* optional */}
          
        </div>
      </div>
    )
  }
} 

export default Header;