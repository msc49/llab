import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'semantic-ui-react'
import '../../img/image.png'
import express from '../../apis/express'
import './LoanItem.css'

 const LoanItem = ({loanItem, session, getLoans}) => {

  const { _id: itemId, name, description, images, lender, borrower, requests } = loanItem
  const { id: userId } = session ? session.user : ""

    // set rating when we get value from item
    let r = Math.floor(Math.random() * 5) + 1;
    const RatingStar = () => (
      <Rating icon='star' defaultRating={r} maxRating={5} disabled/>
    )  

    const myRequest = requests.filter(request => request.requester === userId)[0]
    console.log('my request', myRequest)

    const removeRequest = async () => {
      const { data } = await express.delete(`items/${itemId}/requests/${myRequest._id}`)
      console.log(data)
      console.log('decline')
      getLoans()
    }

    const returnRequest = async () => {
      const { data } = await express.put(`items/${itemId}/returns/${myRequest._id}`)
      console.log(data)
      console.log('decline')
      getLoans()
    }

  return (

    <div className='ui card'>
      
      <div className='content'>
        {/* not showing? */}
        <div className="right floated tiny ui image">
          <img className="" src={ lender.images[0] ? lender.images[lender.images.length-1].path : "https://react.semantic-ui.com//images/avatar/large/elliot.jpg"} alt=''/>
        </div>
        <Link to={`/items/${itemId}`}>
          <h3 className="header">{name}</h3>
        </Link>
        {description}

        <div className="meta">  
          Contribute by {lender.name} ({lender.location})
        </div>
      </div>
      
    
        <div className="content">
          <div className="ui column centered right floated">
          
              <div className="ui segment">
                <div className="ui slide masked reveal image">
                  <img className="visible content" src={images[0] ? images[0].path : "https://react.semantic-ui.com/images/wireframe/image.png"} alt=""/>
                  <img src={images[1] ? images[1].path : "https://react.semantic-ui.com//images/avatar/large/elliot.jpg"} className="hidden content" alt=""/>
                </div>
              </div>
              
          </div>
          
          <div className="meta">  
            {/* START */}

            <div className='ui cards request-cards'>
              <div className="ui card request-card">   
                <div className="content">
                  {borrower && borrower._id === myRequest.requester ? <p className="ui floated right green label">Approved</p> : borrower ? <p className="ui floated right orange label">In Use</p> : <p className="ui floated right red label">Pending Approval</p>}
                
                <div className="meta">
                  {borrower && borrower._id === myRequest.requester ? `contact ${lender.name} at ${lender.email}` : ""}
                </div>
                <div className='light-separator'></div>
                <div className="description">
                </div>
                  {borrower === myRequest.requester ? <p>You are currently <span className={`ui text ${Date(Date.now()) > new Date(myRequest.return) ? 'red' : 'blue' }`}><b>borrowing</b></span><b>{name}</b>and are due to return it on <span className={`ui text ${Date(Date.now()) > new Date(myRequest.return) ? 'red' : 'blue' }`}><b>{new Date(myRequest.return).toLocaleString('en-En', {day: "numeric", month: "long"})}.</b></span></p> : ""}
                  {borrower === myRequest.requester && new Date(Date.now()) > new Date(myRequest.return) ? <p><span className="ui error text">Return Overdue!</span> .</p> : ""}
                  {myRequest.requester !== borrower && new Date(Date.now()) > new Date(myRequest.return) ? <p><span className="ui error text">Expired Request.</span> Please remove from your dashboard.</p> : ""}
                </div>

                
                <div className="extra content">
                  <div>
                    {borrower === myRequest.requester ? <button onClick={returnRequest} className="ui fluid basic green button">Return</button> : ""}
                    {borrower !== myRequest.requester ? <button onClick={removeRequest} className="ui fluid basic red button">Remove</button> : ""}
                  </div>
                </div>
              </div>
            </div>
            {/* END*/}

            
          </div>
        </div>
      
        <div className="extra">
          <div>
            Rating: <RatingStar />
          </div>
        </div>

    </div>
    
  )
}

export default LoanItem