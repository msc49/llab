import React, { useState, useEffect } from "react";
import Item from './Item'
import express from "../../apis/express";

const ItemList = ({session}) => {

  const [itemList, setItemList] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    getItems()
  }, [])

  const getItems = async () => {
    const { data } = await express.get('/items')
    setItemList(data)
  }

  const addItem = async (event) => {
    event.preventDefault()
    if(session) {
      const { id: userId } = session.user
      const { data } = await express.post('/items', {
        item: {
          name: name,
          description: description,
          lender: userId
        }
      })
    }
    
    getItems()
  }

  const deleteItem = async (id) => {

    const { data } = await express.delete(`/items/${id}`)
    getItems()
  }

  const borrowItem = async (id) => {
    if(session) {
      const { id: userId } = session.user
      const { data } = await express.put(`/items/${id}/borrow/${userId}`)
    }
    getItems()
  }

  const updateItem = async (event, name, description, lender, borrower, id) => {
    event.preventDefault()
    // const { data } = 
    await express.put(`/items/${id}`, {
      item: {
        name: name,
        description: description,
      }
    })
   
    getItems()
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
    getItems()
  }

  const renderedList = itemList.map(item => {
    return (
      <Item 
        key={item._id} 
        item={item}
        deleteItem={deleteItem}
        updateItem={updateItem}
        uploadImage={uploadImage}
        borrowItem={borrowItem}
      />
    )
  })

  return (
    <div>
      <form onSubmit={addItem}>
      <input onChange={(event) => setName(event.target.value)} value={name} type="text" name="name" placeholder="name" required/>
      <input onChange={(event) => setDescription(event.target.value)} value={description} type="text" placeholder="description" name="description" required/>
      <button className="ui button">Add Item</button>
      </form>
      {renderedList}
    </div>
  )

}

export default ItemList
