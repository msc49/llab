import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
import MediaQuery from 'react-responsive'
import Modal from '../Modal/addItemModal';
import './Header.css';
import express from '../../apis/express';

const Header = ({session, setSession, setAlert}) => {
  const [modalOpen, setModalOpen] = useState(false)

  const [formItem, setFormItem] = useState({
    itemName: "",
    itemDescription: '',
    imageTitle: "",
    imageFile: "",
    })

  const addItem = async (event) => {
    event.preventDefault()
    if(session) {
      const { id: userId } = session.user
      const { data } = await express.post('/items', {
        item: {
          name: formItem.itemName,
          description: formItem.itemDescription,
          lender: userId,
          title: formItem.imageTitle,
          itemImage: formItem.imageFile,
        }
      })
      setModalOpen(false)
      const { name: itemName, lender } = data
      setAlert({type: 'success', header: `Thanks you for your contribution ${lender.name}`, event: 'ADD_ITEM', itemName, location: lender.location});
    }
  }

  const handleChange = (event) => { 
    const {value, name} = event.target
    setFormItem(prevItem => ({
    ...prevItem, [name]: value})
    )
  }

  const signOut = () => {
    localStorage.removeItem('user')
    setSession(false)
  }

// eslint-disable-next-line
  const openAddItemModal = () => {
    const addItemModal = document.getElementById('add-item-modal')
    console.log(addItemModal)
    addItemModal.classList.add("active")
  }

  if(session) {
    return (
      <div className="ui borderless fixed top sticky massive menu">
        {/* Logo */}
        <Link to='/' className="item">
          Local Lab
        </Link>
        
        <div className='right menu'>
          {/* Modal: Only Displayed On Plus Icon Click */}
          <Modal modalOpen={modalOpen}>
            <div id="add-item-modal" class="my-modal">
              <div class="my-modal-content">
                <span class="my-modal-close" onClick={() => setModalOpen(false)}>&times;</span>

                {/* Modal Content */}
                <div className="user-form ui middle aligned center aligned grid">
                  <div className="column">
                
                    <h2 className="ui image header">
                      <div className="content">
                        Lend a new item
                      </div>
                    </h2>

                    <form onSubmit={addItem} className="ui large form" noValidate>
                      <div className="ui stacked segment">

                        <div className="field ui left aligned container">
                            <label htmlFor="item-name"><span className='ui medium text'>Item name</span></label>
                              <input onChange={handleChange} value={formItem.itemName} type="text" id="itemName" name="itemName" placeholder="Bosch Hammer Drill EasyImpact 550W" required/>
                        </div> 

                        <div className="field ui left aligned container">
                          <label htmlFor="item-description"><span className='ui medium text'>Item decription</span></label>
                            <textarea onChange={handleChange} value={formItem.itemDescription} rows="4" name="itemDescription" placeholder={`1 year old power drill w/ carrying case\nLightweight, compac, cordless\nCondition: Good`} required/>
                        </div> 

                        <button className="fluid ui large primary button">Lend</button>

                      </div>
                    </form>
                
                  </div>
                </div>
                {/* modal Content End */}
              </div>
            </div>
          </Modal>

          {/* Blue Plus Icon to Open Modal */}
          <div className='item'>
            <Popup
              content={'Quick Add New Item'}
              trigger={<Link to='#' onClick={() => setModalOpen(true)}><i class="large blue plus icon"></i></Link>}
            />
          </div>

          {/* User Avatar & Name: Opens Dropdown Options */}
          <div className="item">
            <div className="ui inline simple dropdown">

              <div className="text">
                <img className="ui avatar image" src="https://fomantic-ui.com/images/avatar/small/elliot.jpg" alt=""/>
                {session.user.username}
              </div>
              {/* Drop Down Meny */}
              <div className="menu">

                <div className="item">
                  <i className="bell icon"></i>
                  Notifications
                </div>

                <div className="item">
                  <Link to="/profile">
                  <i className="user circle outline icon"></i>

                  Profile
                  </Link>
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

        {/* Logo */}
        <Link to='/' className="item">
          Local Lab
        </Link>

        <div className='right menu'>
          {/* Stats: Only Displayed On Large Screens */}
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