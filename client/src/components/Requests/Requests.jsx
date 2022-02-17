import React, {useState, useEffect} from 'react'
import express from '../../apis/express'

import RequestItem from './RequestItem'

const Requests = ({session}) => {

  const [requestsList, setRequestsList] = useState([])
  console.log(requestsList)

  console.log('session',session)
  const { id } = session ? session.user : ""

  useEffect(() => {
    getRequests()
  }, [])

  const getRequests = async () => {
    const { data } = await express.get(`/items/requests/${id}`)
    setRequestsList(data)
  }

  const renderedRequestsList = requestsList.map(requestItem => {
    return (
      <RequestItem 
        key={requestItem._id} 
        requestItem={requestItem}
        session={session}
        getRequests={getRequests}
      />
    )
  })

  return (
    <div>
      <h2 className="ui header">
        <i className="red bell icon"></i>
        <div className="content">
          Item Requests
          <div className="sub header">Manage your requests</div>
        </div>
      </h2>
      <div className="ui one cards main-item-list">
        {renderedRequestsList}
      </div>
    </div>
  )
}


export default Requests