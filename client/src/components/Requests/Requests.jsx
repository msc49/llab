import React, {useState, useEffect} from 'react'
import { Divider } from 'semantic-ui-react'
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
        // profilePic={profilePic}
        session={session}
      />
    )
  })

  return (
    <div className="ui one cards main-item-list">
      {renderedRequestsList}
    </div>
  )
}


export default Requests