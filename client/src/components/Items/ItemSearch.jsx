import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Item from './Item';
import HomeBanner from '../Home/HomeBanner';
import '../Home/Home.css';
import express from "../../apis/express";
import './ItemList.css'

const ItemList = ({session, refreshItems, setRefreshItems, profilePic, searchItems, setSearchItems}) => {
  console.log('SEARCH PAGE:', searchItems)

  let history = useHistory();

  const [itemList, setItemList] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [searchItem, setSearchItem] = useState("")

  // useEffect(() => {
  //   if(searchItems) {
  //     // display itema
  //     setSearchItems(false)
  //   }
  // }, [searchItems, searchItems])

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

  const submitSearch = async (e) => {
    e.preventDefault()
    console.log('I am searching.......!!!!!!!!')
    console.log('SEARCH ITEM IN function', searchItem)
    const { data } = await express.get(`/items/search/${searchItem}`)
    history.push(`/items/search/${searchItem}`);
    console.log(data)
  }

  const renderedList = searchItems.map(item => {
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
      <HomeBanner />
      <div className="main-content">

      <form onSubmit={submitSearch}>
        <div className="ui action icon focus fluid large input">
          <input onChange={e => setSearchItem(e.target.value)} type="text" placeholder="Search for items..." />
            <i onClick={submitSearch} class="search link icon"></i>
        </div>  
      </form>

      <div className="ui one stackable cards main-item-list">
        {renderedList}
      </div>

      </div>
  
     
    </div>
  )

}

export default ItemList