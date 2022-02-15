import React, {useState} from "react";
import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
import { Rating } from 'semantic-ui-react'
import '../../img/image.png';
import Modal from '../Modal/Modal';
import express from "../../apis/express";





const Item = ({ item, deleteItem, borrowItem }) => {


  const user = JSON.parse(localStorage.getItem('user'))
  const {_id: id, name, description, images, lender, borrower} = item
  const [modalOpen, setModalOpen] = useState(false)

   // Update Item States
  const [itemName, setName] = useState("")
  const [itemDescription, setDescription] = useState("")
  const [formImage, setFormImage] = useState(null);


    const [itemList, setItemList] = useState([])
  

    const getItems = async () => {
      const { data } = await express.get('/items')
      setItemList(data)
    }
  
  
  
    const updateItem = async (event, name, description, lender, borrower, id, available,  setAlert, refreshItems, setRefreshItems) => {
      event.preventDefault()
      // const { data } = 
      await express.put(`/items/${id}`, {
        item: {
          name: name,
          description: description,
          available:available
        }
      })

      if(formImage) await uploadImage(id)
      setFormImage(null)
   
      setModalOpen(false)

      setRefreshItems(true)

      getItems();

    }

  
    const uploadImage = async (event, imageTitle, imageFile, id) => {
      event.preventDefault()
      let formData = new FormData()
      formData.append('title', imageTitle)
      formData.append('itemImage', imageFile)
  
      try {
        const { data } = await express.post(`/items/${id}/images`, formData)
        console.log(data)
      } catch(err) {
        console.log(err)
      }
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
        <img className="ui avatar image" src="https://fomantic-ui.com/images/avatar/small/elliot.jpg" alt="" data-title="blablabla"/> 
        {lender ? `contributed by ${lender.name}` : 'Anon'}
      </div>
      
      <div className="image">
        <img src={item.images ? item.images[0] : '../../img/image.png'} alt=""/>
      </div>

      <div className="content">
        <div className="ui column centered right floated">
         
            <div className="ui attached segment">
              <div className="ui slide masked reveal image tiny">
                <img className="visible content" src={item.images[0] ? item.images[0].path : "https://react.semantic-ui.com/images/wireframe/image.png"} alt=""/>
                <img src={item.images[1] ? item.images[1].path : "https://react.semantic-ui.com//images/avatar/large/elliot.jpg"} class="hidden content" alt=""/>
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
            setFormImage(null)
            }}>&times;</span>

          {/* Modal Content */}
          <div className="ui center aligned grid">
            <div className="column">
          
              <h2 className="ui inverted image header">
                <div className="content">
                  Update item
                </div>
              </h2>

              <form onSubmit={(event) => updateItem(event, itemName, itemDescription, item.lender, item.borrower, item._id, item.available)} className="ui large form my-modal-form" encType='multipart/form-data' noValidate>
                <div className="ui stacked segment my-modal-segment">

                  <div className="field ui left aligned container">
                    <label htmlFor="item-name"><span className='ui medium text'>Item name</span></label>
                    <input onChange={(event) => setName(event.target.value)} value={itemName} type="text" name="name" required/>

                  </div> 

                  <div className="field ui left aligned container">
                    <label htmlFor="item-description"><span className='ui medium text'>Item decription</span></label>
                    <input onChange={(event) => setDescription(event.target.value)} value={itemDescription} type="text" name="description" required/>
                  </div> 

                  <div className='light-separator'></div>
                  
                  <div className="field ui center aligned container">
                              <label for="file-upload" class="custom-file-upload">
                              <i class="upload green icon"></i> Upload image
                              </label>
                              <input onChange={handleImageChange} id="file-upload" name="imageFile" type="file" accept="image/*"/>
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