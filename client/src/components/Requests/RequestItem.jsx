import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'semantic-ui-react'
import '../../img/image.png'
// import HomeBanner from '../Home/HomeBanner'

 const RequestItem = ({requestItem, session}) => {

  const { _id: itemId, name, description, images, requests } = requestItem
    // set rating when we get value from item
    let r = Math.floor(Math.random() * 5) + 1;
    const RatingStar = () => (
      <Rating icon='star' defaultRating={r} maxRating={5} disabled/>
    )
    
    
    const reqs = requests.map(request => request.requester)
    const singleReq = reqs.map(singleReq => {
      return (
        <div className='ui cards'>
          
          <div class="card">
            <div class="content">
              <img class="right floated mini ui image" src="/images/avatar/large/elliot.jpg" alt=''/>
              <div class="header">
              {singleReq.name}
              </div>
              <div class="meta">
                {singleReq.location}
                {singleReq.email}
              </div>
              <div class="description">
                {singleReq.name} requested to borrow your {name}
              </div>
            </div>
            <div class="extra content">
              <div class="ui two buttons">
                <div class="ui basic green button">Approve</div>
                <div class="ui basic red button">Decline</div>
              </div>
            </div>
          </div>
        
        </div>
      )
    } )


  return (
    // <div>
    // <HomeBanner />

    <div className='ui card'>

    
    <div className="content">
        <div className="ui column centered right floated">
         
            <div className="ui attached segment">
              <div className="ui slide masked reveal image">
                <img className="visible content" src={images[0] ? images[0].path : "https://react.semantic-ui.com/images/wireframe/image.png"} alt=""/>
                <img src={images[1] ? images[1].path : "https://react.semantic-ui.com//images/avatar/large/elliot.jpg"} className="hidden content" alt=""/>
              </div>
            </div>
            
        </div>
        
        <Link to={`/items/${itemId}`}>
          <h3 className="header">{name}</h3>
        </Link>
          {description}
        <br/>
        <p></p>
        <div className="meta">

        {/* {requests ? requests.forEach(request => (request.requester)) : ""}
        {requests.forEach(request => (request.requester))} */}
        
        {singleReq}
   
          
      
          {/* {borrower ? <p><span className="ui blue text">Availble Soon</span></p>: <p><span className="ui green text">Available now</span></p>} */}
        </div>
      </div>
      
      <div className="extra">
        <div>
          Rating: <RatingStar />
        
        </div>
      </div>
    </div>
    // </div>
  )
}

export default RequestItem