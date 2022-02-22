import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
import { Rating } from 'semantic-ui-react'
import express from "../../apis/express";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Modal from '../Modal/Modal';
import ModalUpdate from '../Modal/ModalUpdate';
import '../images/image.png'
import './Item.css'

const Item = ({ item, session, setAlert, getItems }) => {

  const {_id: id, name, description, images, available: availability, lender, borrower} = item
  const currentApprovedRequest = item.requests.find(request => request.approved)
  
  const [modalOpen, setModalOpen] = useState(false)
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false)
  const [requestMessage, setRequestMessage] = useState("")
  const [calendar, setCalendar] = useState(new Date(Date.now() + (7*24*60*6*1000)));
  const [labItemName, setLabItemName] = useState("")
  const [labItemDescription, setLabItemDescription] = useState("")
  const [labItemAvailability, setLabItemAvailability] = useState(true)
  const [labItemImage, setLabItemImage] = useState(null)


  let r = Math.floor(Math.random() * 5) + 1;
  const RatingStar = () => (
    <Rating icon='star' defaultRating={r} maxRating={5} disabled/>
  )

  const requestItem = async (event) => {
    event.preventDefault()
   
    const { data } = await express.post('/items/requests', {
      request: {
        itemId: id,
        borrowerId: session ? session.user.id : "", 
        requestMessage: requestMessage,
        date: calendar,
      } 
    })
    setModalOpen(false)
    setAlert({type: 'success', header: "Request sent successfully!", event: 'REQUEST_ITEM', username: session ? session.user.username : "", itemName: name, lender: lender.username});
  }

  const updateLabItem = async (event) => {
    event.preventDefault()
    const { data } = await express.put(`/items/${id}`, {
      item: {
        name: labItemName,
        description: labItemDescription,
        available: labItemAvailability,
      }
    }) 
    console.log(data)
    if(labItemImage) await labImageUpload(id)
    setLabItemImage(null)
    setModalUpdateOpen(false)
    await getItems()
  }

  const labImageUpload = async (id) => {
    
    let formData = new FormData()
    formData.append('itemImage', labItemImage)

    try {
      const { data } = await express.post(`/items/${id}/images`, formData)
      console.log(data)
    } catch(err) {
      console.log(err)
    }

  }

  const handleLabItemImageChange = (event) => {
    console.log('hdllod')
    console.log('something changed')
    console.log(event.target.files[0])
    setLabItemImage(event.target.files[0])
    showImagePreview(event)
  }

  const showImagePreview = (event) => {
    if(event.target.files.length > 0){
      const src = URL.createObjectURL(event.target.files[0]);
      const preview = document.getElementById("lab-file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
    } else {
      const preview = document.getElementById("lab-file-ip-1-preview");
      preview.src = "";
      preview.style.display = "none";
    }
  }
 

  return (
    <div className="ui card">
      
    <div className="content">
   
      <div className="right floated meta">
      <Popup
        content={'Angel'}
        trigger={<em data-emoji="angel"></em>}
      />
      <Popup
        content={'Heart of Gold'}
        trigger={<em data-emoji="yellow_heart"></em>}
      />
      <Popup
        content={'Community Hero'}
        trigger={<em data-emoji="ant"></em>}
      />
      <Popup
        content={'New Lender'}
        trigger={<em data-emoji="cherries"></em>}
      />
      <Popup
        content={'Book Worm'}
        trigger={<em data-emoji="book"></em>}
      />
  
      </div>
        <img className="ui avatar image" src={lender.image ? lender.image : "https://fomantic-ui.com/images/avatar/small/elliot.jpg"} alt="" data-title="blablabla"/> 
        {lender ? `contributed by ${lender.name}` : 'Anon'}
      </div>
      
      <div className="image">
        <img src={item.images ? item.images[0] : '../../img/image.png'} alt=""/>
      </div>

      <div className="content">
        <div className="ui column centered right floated">
         
            <div className="ui attached segment">
              <div className="ui slide masked reveal image">
                <img className="visible content" src={images[0] ? images[0].path : "https://react.semantic-ui.com/images/wireframe/image.png"} alt=""/>
                <img src={images[1] ? images[1].path : "https://react.semantic-ui.com//images/avatar/large/elliot.jpg"} className="hidden content" alt=""/>
              </div>
            </div>

            {
              session && session.user.id === lender._id ? <div className={`ui bottom attached grey button`} tabIndex="0" onClick={() => setModalUpdateOpen(true)}>
              Update
              </div> :
              <div onClick={() => setModalOpen(true)} className="ui bottom attached blue button" tabIndex="0">
              Request
            </div>
            }
            
         
        </div>
        
        <Link to='#'>
          <h3 className="header">{name}</h3>
        </Link>
          {description}
        <br/>
        <p></p>
        <div className="meta">
          Location: {lender.location}
          {borrower ? <p><span className="ui blue text">Availble {new Date(currentApprovedRequest.return).toLocaleString('en-En', {day: "numeric", month: "long"})}</span></p>
          : borrower && new Date(Date.now()) > new Date(currentApprovedRequest.return) ? <p>This item was due to be returned on {new Date(currentApprovedRequest.return).toLocaleString('en-En', {day: "numeric", month: "long"})}</p> 
          : <p><span className="ui green text">Available now</span></p>}
          
        </div>
      </div>
      
      <div className="extra">
        <div>
          Rating: <RatingStar />
        
        </div>
      </div>
      
     

      {/* <button onClick={() => deleteItem(item._id)}>Delete</button> */}

          <Modal modalOpen={modalOpen}>
            <div id="add-item-modal" className="my-modal">
              <div className="my-modal-content">
                <span className="my-modal-close" onClick={() => {setModalOpen(false)}}>&times;</span>

                {/* Modal Content */}
                <div className="ui center aligned grid">
                  <div className="column">
                
                    <h2 className="ui inverted image header">
                      <div className="content">
                        Request {name} from {lender.name}
                      </div>
                    </h2>

                    <form onSubmit={requestItem} className="ui large form my-modal-form">
                      <div className="ui stacked segment my-modal-segment">

                        <div className="field ui left aligned container">
                          <label htmlFor="request-message"><span className='ui medium text'>Request message</span></label>
                          <textarea onChange={event => setRequestMessage(event.target.value)} defaultValue={`Hi, ${item.lender.name}!  ${session ? `My name is ${session.user.name}` : "" }. I'd love to borrow your ${item.name} for a couple weeks. I'll take great care of it and get it back to you in great shape. I'm flexible for a hand over anywhere around ${session ? session.user.location : "your area" }.`} rows="4" name="itemDescription"/>
                        </div> 

                        <div className='light-separator'></div>

                        <div className="field ui center aligned container">
                          <div className="ui container field image-preview">
                            <img className="request-item-image ui center aligned small image" src={item.images[0] ? item.images[0].path : ""} alt=""/>                  
                          </div>
                        </div>  

                        <div className="field ui center aligned segment">
                          <div className="calendar-style">
                            <label htmlFor="return-calendar"><span className='ui large text blue'>Choose your intended return date:</span></label>
                            <p></p>
                            <Calendar onChange={(event) => setCalendar(event)} value={calendar}   />
                          </div>
                        </div>             
                        <button className="fluid ui large primary button">Request</button>

                      </div>
                    </form>
                
                  </div>
                </div>
                {/* modal Content End */}
              </div>
            </div>
          </Modal>

          {/* Modal 2 (item update) */}
          <ModalUpdate modalUpdateOpen={modalUpdateOpen}>
            <div id="add-item-modal" className="my-modal">
              <div className="my-modal-content">
                <span className="my-modal-close" onClick={() => {
                  setModalUpdateOpen(false)
                  setLabItemImage(null)
                  }}>&times;</span>

                  {/* Modal Content */}
                  <div className="ui center aligned grid">
                    <div className="column">
                  
                      <h2 className="ui inverted image header">
                        <div className="content">
                          Update item
                        </div>
                      </h2>

                      <form onSubmit={updateLabItem} className="ui large form my-modal-form" encType='multipart/form-data' noValidate>
                        <div className="ui stacked segment my-modal-segment">
                          {/* WORKING FROM HERE!!!!!!!!!!!!!!!!!! */}
                        <div className="field ui left aligned container">
                          <label htmlFor="item-name"><span className='ui medium text'>Item name</span></label>
                          <input onChange={(event) => setLabItemName(event.target.value)} defaultValue={name} type="text" name="itemName" required/>
                        </div> 

                        <div className="field ui left aligned container">
                          <label htmlFor="item-description"><span className='ui medium text'>Item decription</span></label>
                          <input onChange={(event) => setLabItemDescription(event.target.value)} defaultValue={description} type="text" name="itemDescription" required/>
                        </div> 
                        
                        <div class="ui checkbox">
                          <input onChange={() => setLabItemAvailability(!labItemAvailability)} type="checkbox" checked={labItemAvailability ? 'checked': ''} />
                          <label>{labItemAvailability ? 'listed': 'unlisted'}</label>
                        </div>
                      

                        <div className='light-separator'></div>
                  
                        {/* <div className="field ui center aligned container">
                          <label htmlFor="file-upload" className="custom-file-upload">
                            <i className="upload green icon"></i> Upload a new image
                          </label>
                          <input onClick={handleLabItemImageChange} id="file-upload-update" name="labItemImage" type="file" accept="image/*"/>
                        </div>   

                        <div className="ui container field lab-image-preview">
                          <img id="lab-file-ip-1-preview" className="ui center aligned small image" src="https://fomantic-ui.com//images/wireframe/image.png" alt=""/>                  
                        </div> */}

                        <button className="fluid ui large primary button">Update</button>

                      </div>
                    </form>
                
                  </div>
                </div>
                {/* modal Content End */}
              </div>
            </div>
          </ModalUpdate>
        </div>
  )
 
}

export default Item

