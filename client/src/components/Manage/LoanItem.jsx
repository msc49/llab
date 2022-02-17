import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'semantic-ui-react'
import '../../img/image.png'
import express from '../../apis/express'
import './LoanItem.css'

 const LoanItem = ({loanItem, session, getLoans, setAlert}) => {

  const { _id: itemId, name, description, images, lender, borrower, requests } = loanItem
  const { id: userId } = session ? session.user : ""

    // SET RATING
    let r = Math.floor(Math.random() * 5) + 1;
    const RatingStar = () => (
      <Rating icon='star' defaultRating={r} maxRating={5} disabled/>
    )  

    const myRequest = requests.filter(request => request.requester === userId)[0]


    const removeRequest = async () => {
      const { data } = await express.delete(`items/${itemId}/requests/${myRequest._id}`)
      getLoans()
      setAlert({type: 'warning', header: "Request Removed!", event: 'REMOVE_REQUEST', itemName: name, lender});
    }

    const returnRequest = async () => {
      const { data } = await express.put(`items/${itemId}/returns/${myRequest._id}`)
      getLoans()
      setAlert({type: 'success', header: "Return Requested!", event: 'RETURN_REQUEST', itemName: name, lender});
    }

  return (

    <div className='ui card'>
      
      <div className='content'>
        {/* not showing? */}
        <div className="right floated tiny ui image">
          <img className="" src={ lender.image ? lender.image : "https://react.semantic-ui.com//images/avatar/large/elliot.jpg"} alt=''/>
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
                  {borrower === myRequest.requester && myRequest.return_request ? <p className="ui floated right green label">Return pending confirmation</p> 
                  : borrower === myRequest.requester ? <p className="ui floated right green label">Approved</p> 
                  : borrower ? <p className="ui floated right orange label">In Use</p> 
                  : <p className="ui floated right red label">Request Pending Approval</p>}
                
                <div className="meta">
                  {borrower === myRequest.requester && myRequest.return_request ? `Your return is pending confirmation from the lender. Send ${lender.username} a gentle reminder if this take more than a few days: ${lender.email}` 
                  : borrower === myRequest.requester ? `You're request was approved! Contact ${lender.username} at ${lender.email}` : ""}

                  {borrower && borrower !== myRequest.requester ? <p>Another user is currently borrowing this item, and {new Date(Date.now()) > new Date(myRequest.return) ? 'was' 
                  : 'is'} due to return it by <span className='ui orange text bold'>{new Date(myRequest.return).toLocaleString('en-En', {day: "numeric", month: "long"})}.</span></p>
                  : ""}
                </div>
                <div className='light-separator'></div>
                <div className="description">
                {borrower && borrower !== myRequest.requester ? <p>Why not browse some <Link to='/'><span className='ui orange text bold'>other items</span> </Link> while you wait?</p>: ""}
                </div>
                  {borrower === myRequest.requester && myRequest.return_request ? <p>Thank you for returning this item. Find your next <Link to='/'><span className='ui orange text bold'>local gem <em data-emoji="gem"></em></span> </Link> today!</p> 
                  : borrower === myRequest.requester ? <p>You are currently <span className={`ui text ${new Date(Date.now()) > new Date(myRequest.return) ? 'red' : 'blue' }`}><b>borrowing</b></span><b>{name}</b>and {new Date(Date.now()) > new Date(myRequest.return) ? 'were' : 'are'} due to return it by <span className={`ui text ${new Date(Date.now()) > new Date(myRequest.return) ? 'red' : 'blue' }`}><b>{new Date(myRequest.return).toLocaleString('en-En', {day: "numeric", month: "long"})}.</b></span></p> 
                  : ""}
                  {borrower === myRequest.requester && new Date(Date.now()) > new Date(myRequest.return) ? <p><span className="ui error text">Return Overdue!</span></p> : ""}
                  {myRequest.requester !== borrower && new Date(Date.now()) > new Date(myRequest.return) ? <p><span className="ui error text">Expired Request.</span> Please remove from your dashboard.</p> : ""}
                </div>

                
                <div className="extra content">
                  <div>
                    {borrower === myRequest.requester && myRequest.return_request ? <button className="ui fluid basic green disabled button">Returned</button> 
                    : borrower === myRequest.requester ? <button onClick={returnRequest} className="ui fluid basic green button">Return</button> 
                    : borrower !== myRequest.requester ? <button onClick={removeRequest} className="ui fluid basic red button">Remove</button> :
                    ""}
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