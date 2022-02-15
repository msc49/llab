import React, {useState} from "react";
import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
// import RatingStar from "../semanticUIReact/rating";
import { Rating } from 'semantic-ui-react'
import '../../img/image.png'

const Item = ({ item, deleteItem, updateItem, uploadImage, borrowItem }) => {

  const user = JSON.parse(localStorage.getItem('user'))

  const {_id: id, name, description, images, lender, borrower} = item

  // set rating when we get value from item
  let r = Math.floor(Math.random() * 5) + 1;
  const RatingStar = () => (
    <Rating icon='star' defaultRating={r} maxRating={5} disabled/>
  )
  
  // Update Item States
  // const [name, setName] = useState("")
  // const [description, setDescription] = useState("")

  // Upload Image States
  // const [imageTitle, setImageTitle] = useState("")
  // const [imageFile, setImageFile] = useState("")

  return (
    <div className="card">
      
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
        <img className="ui avatar image" src={lender.images[0] ? lender.images[lender.images.length-1].path : "https://fomantic-ui.com/images/avatar/small/elliot.jpg"} alt="" data-title="blablabla"/> 
        {lender ? `contributed by ${lender.name}` : 'Anon'}
      </div>
      
      <div className="image">
        <img src={item.images ? item.images[0] : '../../img/image.png'} alt=""/>
      </div>

      <div className="content">
        <div className="ui column centered right floated">
         
            <div className="ui attached segment">
              <div className="ui slide masked reveal image tiny">
                <img className="visible content" src={images[0] ? images[0].path : "https://react.semantic-ui.com/images/wireframe/image.png"} alt=""/>
                <img src={images[1] ? images[1].path : "https://react.semantic-ui.com//images/avatar/large/elliot.jpg"} class="hidden content" alt=""/>
              </div>
            </div>

            {user.user.username === lender.username ? 
                 <div className={`ui bottom attached grey button`} tabindex="0" onClick={() => console.log('hi')}>
                     Update
                </div> : 
                <div className={`ui bottom attached ${borrower ? 'blue' : 'green'} button`} tabindex="0">
                    {borrower ? 'Queue' : 'Request'}
                </div>
              }
        </div>
        
        <Link to={`/items/${id}`}>
          <h3 className="header">{name}</h3>
        </Link>
          {description}
        <br/>
        <p></p>
        {/* <div className="meta">
          Location: {lender.location}
          {borrower ? <p><span className="ui blue text">Availble Soon</span></p>: <p><span className="ui green text">Available now</span></p>}
        </div> */}
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
    </div>
  )
 
}

export default Item