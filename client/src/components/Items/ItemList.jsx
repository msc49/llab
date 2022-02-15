import React, { useState, useEffect } from "react";
import Item from './Item'
import express from "../../apis/express";

const ItemList = ({session, refreshItems, setRefreshItems, profilePic}) => {

  const [itemList, setItemList] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    getItems()
  }, [])

  useEffect(() => {
    if(refreshItems) {
      getItems()
      setRefreshItems(false)
    }
  }, [refreshItems, setRefreshItems])

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
        profilePic={profilePic}
      />
    )
  })

  return (
    <div>
      <div className="ui two stackable cards">
        {renderedList}
      </div>
     
    </div>
  )

}

export default ItemList
