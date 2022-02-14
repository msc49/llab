import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
import MediaQuery from 'react-responsive'
import Modal from '../Modal/addItemModal';
import './Header.css';

const Header = ({session, setSession}) => {
  const [modalOpen, setModalOpen] = useState(false)

  const signOut = () => {
    localStorage.removeItem('user')
    setSession(false)
  }

  const openAddItemModal = () => {
    const addItemModal = document.getElementById('add-item-modal')
    console.log(addItemModal)
    addItemModal.classList.add("active")
  }

  if(session) {
    return (
      <div className="ui borderless fixed top sticky massive menu">
        <Link to='/' className="item">
          Local Lab
        </Link>
        
        <div className='right menu'>

          {/* <div className='item'>
            <Popup
              content={'Quick Add New Item'}
              trigger={<Link to='#' ><i class="large blue plus icon"></i></Link>}
            />
          </div> */}

          <Modal modalOpen={modalOpen}>
        <div id="add-item-modal" class="my-modal">
          <div class="my-modal-content">
            <span class="my-modal-close" onClick={() => setModalOpen(false)}>&times;</span>
            {/* Modal Content */}
            <div className="user-form ui middle aligned center aligned grid">
              <div className="column">
            
                <h2 className="ui image header">
                  <div className="content">
                    Log in to your account
                  </div>
                </h2>

                <form onSubmit={()=>{}} className="ui large form" noValidate>
                  <div className="ui stacked segment">
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input onChange={()=>{}} text={()=>{}} name="username" placeholder="Username" value={()=>{}} required/>
                      </div>
                    </div> 

                    <div className="field">
                      <div className="ui left icon input">
                        <i className="lock icon"></i>
                        <input type="password" onChange={()=>{}} text={()=>{}} name="password" placeholder="Password" value={()=>{}} />
                      </div>
                    </div> 

                    <button className="fluid ui large primary button">Log in</button>

                    <div className='light-separator'></div>

                    <div>
                      <p>New here?</p>
                      <p className="ui primary basic button" onClick={()=>{}}>Create new account</p>
                    </div> 

                  </div>
                </form>
            
              </div>
            </div>
            {/* modal Content End */}
          </div>
        </div>
        </Modal>

        <div className='item'>
          <Popup
            content={'Quick Add New Item'}
            trigger={<Link to='#' onClick={() => setModalOpen(true)}><i class="large blue plus icon"></i></Link>}
          />
        </div>

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

          <MediaQuery query='(min-device-width: 700px)'>
            <div className="item">
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
                  <span className='ui small blue text'><i className="gift icon"></i> 2.3M</span>
                </div>
             
                <div className="label">
                  <span className='ui small text'>Items</span>
                </div>
              </div>

            </div>
          </div>
          </MediaQuery>    
        </div>
      </div>
    )
  }
} 

export default Header;