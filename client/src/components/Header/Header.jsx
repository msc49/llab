import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import Modal from '../Modal/Modal';
import './Header.css';
import express from '../../apis/express';
import logo_image from '../images/local-lab.png'

const Header = ({session, setSession, setAlert, setRefreshItems, profilePic}) => {
  const [modalOpen, setModalOpen] = useState(false)

  const [formItem, setFormItem] = useState({
    itemName: "",
    itemDescription: '',
  })
  
  const [formImage, setFormImage] = useState(null)

  const addItem = async (event) => {
    event.preventDefault()
    if(session) {
      const { id: userId } = session.user
      const { data } = await express.post('/items', {
        item: {
          name: formItem.itemName,
          description: formItem.itemDescription,
          lender: userId,
        }
      })
      
      const { name: itemName, lender, _id: itemId } = data

      if(formImage) await uploadImage(itemId)
      setFormImage(null)
      setFormItem({
        itemName: "",
        itemDescription: ""
      })
      setModalOpen(false)

      setRefreshItems(true)

      setAlert({type: 'success', header: `Thanks you for your contribution ${lender.name}`, event: 'ADD_ITEM', itemName, location: lender.location});
    }
  }

  const uploadImage = async (id) => {
    
    let formData = new FormData()
    formData.append('itemImage', formImage)

    try {
      const { data } = await express.post(`/items/${id}/images`, formData)
      console.log('image upload response', data)
    } catch(err) {
      console.log(err)
    }

  }

  const handleItemChange = (event) => { 
    const {value, name} = event.target
    setFormItem(prevItem => ({
      ...prevItem, [name]: value}))
  }

  const handleImageChange = (event) => {
    setFormImage(event.target.files[0])
    showImagePreview(event)
  }

  const showImagePreview = (event) => {
    if(event.target.files.length > 0){
      const src = URL.createObjectURL(event.target.files[0]);
      const preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
    }
  }

  const signOut = () => {
    localStorage.removeItem('user')
    setSession(false)
  }

  if(session) {
    return (
      <div className="ui borderless fixed top sticky massive menu">
        {/* Logo */}
        <Link to='/' className="item">
          <img src={logo_image} alt="logo"></img>
          Local Lab
        </Link>
        
        <div className='right menu'>
          {/* Modal: Only Displayed On Plus Icon Click */}
          <Modal modalOpen={modalOpen}>
            <div id="add-item-modal" class="my-modal">
              <div class="my-modal-content">
                <span class="my-modal-close" onClick={() => {
                  setModalOpen(false)
                  setFormImage(null)
                  }}>&times;</span>

                {/* Modal Content */}
                <div className="ui center aligned grid">
                  <div className="column">
                
                    <h2 className="ui inverted image header">
                      <div className="content">
                        Lend a new item
                      </div>
                    </h2>

                    <form onSubmit={addItem} className="ui large form my-modal-form" encType='multipart/form-data' noValidate>
                      <div className="ui stacked segment my-modal-segment">

                        <div className="field ui left aligned container">
                          <label htmlFor="item-name"><span className='ui medium text'>Item name</span></label>
                            <input onChange={handleItemChange} value={formItem.itemName} type="text" id="itemName" name="itemName" placeholder="Bosch Hammer Drill EasyImpact 550W" required/>
                        </div> 

                        <div className="field ui left aligned container">
                          <label htmlFor="item-description"><span className='ui medium text'>Item decription</span></label>
                          <textarea onChange={handleItemChange} value={formItem.itemDescription} rows="4" name="itemDescription" placeholder={`1 year old power drill w/ carrying case\nLightweight, compac, cordless\nCondition: Good`} required/>
                        </div> 

                        <div className='light-separator'></div>

                        <div className="field ui center aligned container">
                          <label for="file-upload" class="custom-file-upload">
                          <i class="upload green icon"></i> Upload image
                          </label>
                          <input onChange={handleImageChange} id="file-upload" name="imageFile" type="file" accept="image/*"/>
                        </div>               

                        <div className="ui container field image-preview">
                          <img id="file-ip-1-preview" class="ui center aligned small image" src="https://fomantic-ui.com//images/wireframe/image.png" alt=""/>                  
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
            <Link to='#' onClick={() => setModalOpen(true)}><i class="large blue plus icon"></i></Link>
          </div>

          {/* User Avatar & Name: Opens Dropdown Options */}
          <div className="item">
            <div className="ui inline simple dropdown">

              <div className="text">
                <img className="ui avatar image" src={profilePic ? profilePic[0].path : "https://fomantic-ui.com/images/avatar/small/elliot.jpg"} alt=""/>
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