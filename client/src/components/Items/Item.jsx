import React, {useState} from "react";
import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
import { Rating } from 'semantic-ui-react'
import '../../img/image.png';
import Modal from '../Modal/Modal';
import express from "../../apis/express";


const Item = ({ item, deleteItem, borrowItem, getItems, setRefreshItems }) => {

  const user = JSON.parse(localStorage.getItem('user'));

  const {_id: id, name, description, images, lender, borrower, available} = item;

  const [modalOpen, setModalOpen] = useState(false)

   // Update Item States
  // const [itemName, setName] = useState("");
  // const [itemDescription, setDescription] = useState("");
  // const [itemAvailable, setAvailability] = useState(true);



  const [formItem, setFormItem] = useState({
    itemName: "",
    itemDescription: "",
    itemAvailable: true
  })

  const [itemAvailable, setAvailability] = useState(true);

  const [newImage, setNewImage] = useState(null);

    const updateItem = async (event) => {
      event.preventDefault()
      const { data } = await express.put(`/items/${id}`, {
        item: {
          name: formItem.itemName,
          description: formItem.itemDescription,
          available: itemAvailable,
        }
      })

      const { name: itemName, lender, _id: itemId } = data


      if(newImage) await uploadImage(itemId)
      setNewImage(null)
      setFormItem({
        itemName: "",
        itemDescription: "",
        itemAvailable: true

      })

      setModalOpen(false)

      getItems();

      setRefreshItems(true)
    }

  
    const uploadImage = async (id) => {
      let formData = new FormData()
      formData.append('itemImage', newImage)
  
      try {
        const { data } = await express.put(`/items/${id}/images`, formData)
        console.log(data)
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
      setNewImage(event.target.files[0])
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
  
     // set rating when we get value from item
    let r = Math.floor(Math.random() * 5) + 1;
    const RatingStar = () => (
    <Rating icon='star' defaultRating={r} maxRating={5} disabled/>);  
  
 

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
        <img className="ui avatar image" src={lender.images && lender.images[0] ? lender.images[lender.images.length-1].path : "https://fomantic-ui.com/images/avatar/small/elliot.jpg"} alt="" data-title="blablabla"/> 
        {lender ? `contributed by ${lender.name}` : 'Anon'}
      </div>
      
      <div className="image">
        <img src={item.images ? item.images[0] : '../../img/image.png'} alt=""/>
      </div>

      <div className="content">
        <div className="ui column centered right floated">
         
            <div className="ui attached segment">
              {/* on mobile make 'large' image to tiny */}
              <div className="ui slide masked reveal image large">
                <img className="visible content" src={images[0] ? images[0].path : "https://react.semantic-ui.com/images/wireframe/image.png"} alt=""/>
                <img src={images[1] ? images[1].path : "https://react.semantic-ui.com//images/avatar/large/elliot.jpg"} class="hidden content" alt=""/>
              </div>
            </div>

            {user.user.username === lender.username ? 
                 <div className={`ui bottom attached grey button`} tabindex="0" onClick={() => setModalOpen(true)}>
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
        <div className="meta">
          Location: {lender.location}
          {item.available ? <p><span className="ui green text">Available now</span></p> : 
          borrower ? <p><span className="ui blue text">Availble Soon</span></p> : <p><span className="ui red text">Not available</span></p>} 
        </div>
      </div>
      
      <div className="extra">
        <div>
          Rating: <RatingStar />
        
        </div>
      </div>

      <div className='right menu'>

      <Modal modalOpen={modalOpen}>
      <div id="add-item-modal" class="my-modal">
        <div class="my-modal-content">
          <span class="my-modal-close" onClick={() => {
            setModalOpen(false)
            setNewImage(null)
            }}>&times;</span>

          {/* Modal Content */}
          <div className="ui center aligned grid">
            <div className="column">
          
              <h2 className="ui inverted image header">
                <div className="content">
                  Update item
                </div>
              </h2>

              <form onSubmit={updateItem} className="ui large form my-modal-form" encType='multipart/form-data' noValidate>
                <div className="ui stacked segment my-modal-segment">

                  <div className="field ui left aligned container">
                    <label htmlFor="item-name"><span className='ui medium text'>Item name</span></label>
                    <input onChange={handleItemChange} value={formItem.itemName} type="text" name="itemName" required/>
                  </div> 

                  <div className="field ui left aligned container">
                    <label htmlFor="item-description"><span className='ui medium text'>Item decription</span></label>
                    <input onChange={handleItemChange} value={formItem.itemDescription} type="text" name="itemDescription" required/>
                  </div> 

                   <div className="ui checkbox">
                   <input type="checkbox" onChange={() => setAvailability(false)} value={itemAvailable} name="itemAvailable" />
                  <label>Mark as unavailable</label>
                </div>

                  <div className='light-separator'></div>
                  
                  <div className="field ui center aligned container">
                              <label for="file-upload" class="custom-file-upload">
                              <i class="upload green icon"></i> Upload a new image
                              </label>
                              <input onChange={handleImageChange} id="file-upload" name="newImage" type="file" accept="image/*"/>
                  </div>   

                  <div className="ui container field image-preview">
                          <img id="file-ip-1-preview" class="ui center aligned small image" src="https://fomantic-ui.com//images/wireframe/image.png" alt=""/>                  
                   </div>
                  <button className="fluid ui large primary button">Update</button>

                </div>
              </form>
          
            </div>
          </div>
          {/* modal Content End */}
        </div>
      </div>
      </Modal>
</div>
    </div>
  )
 
}

export default Item;