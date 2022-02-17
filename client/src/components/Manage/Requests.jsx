import React, {useState, useEffect} from 'react'
import express from '../../apis/express'

import RequestItem from './RequestItem'

const Requests = ({session, setShowLoans, setAlert}) => {

  const [requestsList, setRequestsList] = useState([])

  
  const { id } = session ? session.user : ""

  useEffect(() => {
    const refreshRequests = async () => {
      if(session) {
        const { data } = await express.get(`/items/requests/${id}`)
        setRequestsList(data)
      }
    }
    refreshRequests()
  }, [id, session])

  const getRequests = async () => {
    if(session) {
      const { data } = await express.get(`/items/requests/${id}`)
      setRequestsList(data)
    }
  }

  const renderedRequestsList = requestsList.map(requestItem => {
    return (
      <RequestItem 
        key={requestItem._id} 
        requestItem={requestItem}
        session={session}
        getRequests={getRequests}
        setAlert={setAlert}
      />
    )
  })

  return (
    <div>
      <div className='ui content'>
        <h2 className="ui header">
          <i className="blue bell icon"></i>
          <div className="content">
            Incoming Requests
            <div className="sub header">Manage incoming requests for your items</div>
          </div>
            <button onClick={() => setShowLoans(true)} className="ui right floated primary basic button">Switch to borrowing</button>
        </h2>
      </div>
      <div className="ui one cards main-item-list">
        {renderedRequestsList}
      </div>
    </div>
  )
}


export default Requests