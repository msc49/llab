import React, {useState} from "react";
import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
import { Rating } from 'semantic-ui-react'
import express from "../../apis/express";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Modal from '../Modal/Modal';
import '../../img/image.png'
import './Item.css'

const Item = ({ item, session, setAlert, profilePic, deleteItem, updateItem, uploadImage, borrowItem }) => {
  
  const [modalOpen, setModalOpen] = useState(false)
  const [requestMessage, setRequestMessage] = useState("")
  const [calendar, setCalendar] = useState(new Date(Date.now() + (7*24*60*6*1000)));

  const {_id: id, name, description, images, lender, borrower} = item
  // set rating when we get value from item
  let r = Math.floor(Math.random() * 5) + 1;
  const RatingStar = () => (
    <Rating icon='star' defaultRating={r} maxRating={5} disabled/>
  )

  console.log(session.user.username)
  
  // Update Item States
  // const [name, setName] = useState("")
  // const [description, setDescription] = useState("")

  // Upload Image States
  // const [imageTitle, setImageTitle] = useState("")
  // const [imageFile, setImageFile] = useState("")

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
    setAlert({type: 'success', header: "Request sent successfully!", event: 'REQUEST_ITEM', username: session.user.username, itemName: name, lender: lender.username});
    console.log(data)
  }

  // const updateItem = async (event, name, description, lender, borrower, id) => {
  //   event.preventDefault()
  //   await express.put(`/items/${id}`, {
  //     item: {
  //       name: name,
  //       description: description,
  //     }
  //   }) 
  //   getItems()
  // }

 

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
        <img className="ui avatar image" src={lender.images && lender.images[0] ? lender.images[lender.images.length-1].path : "https://fomantic-ui.com/images/avatar/small/elliot.jpg"} alt="" data-title="blablabla"/> 
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
            <div onClick={() => setModalOpen(true)} className="ui bottom attached blue button" tabIndex="0">
              Request
            </div>
         
        </div>
        
        <Link to='#'>
          <h3 className="header">{name}</h3>
        </Link>
          {description}
        <br/>
        <p></p>
        <div className="meta">
          Location: {lender.location}
          {borrower ? <p><span className="ui blue text">Availble Soon</span></p>: <p><span className="ui green text">Available now</span></p>}
        </div>
      </div>
      
      <div className="extra">
        <div>
          Rating: <RatingStar />
        
        </div>
      </div>
      
      {/* {
        item.lender ? <h4> Lender: {item.lender.name}, {item.lender.location}</h4> : ""
      }  */}
      


      {/* {
        item.borrower ? <h4>Borrower: {item.borrower.name}, {item.borrower.location}</h4> : ""
      } */}

      {/* <button onClick={() => deleteItem(item._id)}>Delete</button> */}

      {/* <button onClick={() => borrowItem(item._id)}>Borrow</button> */}

      {/* <form onSubmit={(event) => updateItem(event, name, description, item.lender, item.borrower, item._id)}>
        <input onChange={(event) => setName(event.target.value)} value={name} type="text" name="name" required/>
        <input onChange={(event) => setDescription(event.target.value)} value={description} type="text" name="description" required/>
        <button>Update Item</button>
      </form> */}

      {/* <form onSubmit={(event) => uploadImage(event, imageTitle, imageFile, item._id)} encType="multipart/form-data">
        <input type="text" name="title" value={imageTitle} placeholder="Image Title" onChange={e => setImageTitle(e.target.value)} required/>
        <input type="file" name="image" onChange={e => setImageFile(e.target.files[0])} multiple/>
        <input type="file" id="imageFile" capture="user" accept="image/*"/>
        <button type="submit">Submit</button>
      </form> */}

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
    </div>
  )
 
}

export default Item

