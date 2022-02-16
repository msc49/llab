import React, { useState, useEffect } from "react";
import Item from './Item'
import express from "../../apis/express";

const UsersItemList = () => {


  const [toggleBorrowing, setToggleBorrowing] = useState(false);


  const [itemList, setItemList] = useState([])
    useEffect(() => {
      getItems()
    }, [])

  const getItems = async () => {
    const { data } = await express.get('/items')
    setItemList(data)
  }

  const deleteItem = async (id) => {
     await express.delete(`/items/${id}`)
    getItems()
  }

  const updateItem = async (event, name, description, lender, borrower, id) => {
    event.preventDefault()
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

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.user.id;

  const renderedLendingList = itemList.map(item => {
    if (item.lender._id === userId) {
      return (
        <Item 
          key={item._id} 
          item={item}
          deleteItem={deleteItem}
          updateItem={updateItem}
          uploadImage={uploadImage}
        />
      )
    }
  });

  const renderedBorrowingList = itemList.map(item => {
     if(item.borrower == null){
       return (
         ""
       )
     } else {
      if (item.borrower._id === userId) {
        return (

          <Item 
            key={item._id} 
            item={item}
            deleteItem={deleteItem}
            updateItem={updateItem}
            uploadImage={uploadImage}
          />
         
        )
      }
     }  
   })

  return (
    <div>
      <div className = "profile-items-header">
          <h3 className="items-heading">
            Item's you're {toggleBorrowing ? 
            <span> borrowing</span> : 
            <span> lending</span>}
          </h3>

          <div className="btn-container">
              <button className="ui button green" onClick={() => setToggleBorrowing(!toggleBorrowing)}> 
                {toggleBorrowing ? 
                  <span> View lending</span> : 
                  <span> View borrowing </span>}
              </button>
          </div>
      </div>
      
      {toggleBorrowing ? 
      <div className="ui two stackable cards">{renderedBorrowingList}</div> : 
      <div className="ui two stackable cards">{renderedLendingList}</div>
      }

    </div>
  )

}

export default UsersItemList

