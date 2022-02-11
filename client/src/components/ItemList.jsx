import React, { useState, useEffect } from "react";
import Item from './Item'
import express from "../apis/express";

const ItemList = () => {

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
    const { data } = await express.post('/items', {
      item: {
        name: name,
        description: description,
        lender: 2,
      }
    })
    
    getItems()
  }

  const deleteItem = async (id) => {
    const { data } = await express.delete(`/items/${id}`)
    
    getItems()
  }

  const updateItem = async (name, description, lender, borrower, id) => {
    const { data } = await express.put(`/items/${id}`, {
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
      />
    )
  })

  return (
    <div>
      <form onSubmit={addItem}>
      <input onChange={(event) => setName(event.target.value)} value={name} type="text" name="name" required/>
      <input onChange={(event) => setDescription(event.target.value)} value={description} type="text" name="description" required/>
      <button>Add Item</button>
      </form>
      {renderedList}
    </div>
  )

}

export default ItemList
