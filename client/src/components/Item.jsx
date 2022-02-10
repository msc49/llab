import React, {useState} from "react";

const Item = ({ item, deleteItem, updateItem }) => {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  return (
    <div>
      <h3>{item.name}</h3>
      <h3>{item.description}</h3>
      <button onClick={() => deleteItem(item._id)}>Delete</button>

      <form onSubmit={() => updateItem(name, description, item.lender, item.borrower, item._id)}>
        <input onChange={(event) => setName(event.target.value)} value={name} type="text" name="name" required/>
        <input onChange={(event) => setDescription(event.target.value)} value={description} type="text" name="description" required/>
        <button>Update Item</button>
      </form>
    </div>
  )
 
}

export default Item