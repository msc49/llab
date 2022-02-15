import React, { useState, useEffect } from "react";
import Item from './Item';
import express from "../../apis/express";
import Modal from '../Modal/Modal';




const UpdateItemForm = () => {

  const [modalOpen, setModalOpen] = useState(false)
  const [formItem, setFormItem] = useState({
    itemName: "",
    itemDescription: '',
  })
  
  const [formImage, setFormImage] = useState(null)


  const updateItem = async (event, name, description, lender, borrower, id, available) => {
    event.preventDefault()
    // const { data } = 
    await express.put(`/items/${id}`, {
      item: {
        name: name,
        description: description,
        available:available
      }
    })
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



return (

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

          <form onSubmit={updateItem} className="ui large form my-modal-form" encType='multipart/form-data' noValidate>
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

              <button className="fluid ui large primary button">Update</button>

            </div>
          </form>
      
        </div>
      </div>
      {/* modal Content End */}
    </div>
  </div>
</Modal>


)


}


export default UpdateItemForm;