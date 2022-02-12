import React, {useState} from "react";

const Item = ({ item, deleteItem, updateItem, uploadImage, borrowItem }) => {

  // Update Item States
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  // Upload Image States
  const [imageTitle, setImageTitle] = useState("")
  const [imageFile, setImageFile] = useState("")

  return (
    <div>
      <p>{item.lender.location}</p>
      <p>{item.lender.name}</p>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>{item.description}</p>


      {
        item.borrower ? <p>borrowed by {item.borrower.name}</p> : ""
      }

      <button onClick={() => deleteItem(item._id)}>Delete</button>

      <button onClick={() => borrowItem(item._id)}>Borrow</button>

      <form onSubmit={(event) => updateItem(event, name, description, item.lender, item.borrower, item._id)}>
        <input onChange={(event) => setName(event.target.value)} value={name} type="text" name="name" required/>
        <input onChange={(event) => setDescription(event.target.value)} value={description} type="text" name="description" required/>
        <button>Update Item</button>
      </form>

      <form onSubmit={(event) => uploadImage(event, imageTitle, imageFile, item._id)} encType="multipart/form-data">
        <input type="text" name="title" value={imageTitle} placeholder="Image Title" onChange={e => setImageTitle(e.target.value)} required/>
        <input type="file" name="image" onChange={e => setImageFile(e.target.files[0])} multiple/>
        <input type="file" id="imageFile" capture="user" accept="image/*"/>
        <button type="submit">Submit</button>
      </form>

    </div>
  )
 
}

export default Item