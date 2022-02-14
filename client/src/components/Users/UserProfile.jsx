import React from 'react'
import UsersItemList from '../Items/UsersItemsList';
import avatar from "../images/user-avatar.jpeg";
import testImage from "../images/linda.jpeg";




const UserProfile = (session) => {


const userDetails = JSON.parse(localStorage.getItem('user')) 


return (
  <div className="ui container"> 
     <div className="profile-wrapper">
        <div className="user-info-container">
              <div className="avatar-container">
                <img alt="user profile" className="avatar" src={testImage}></img>
              </div>
                <span className="profile-username">{userDetails.user.username}</span>
                <span className="profile-location">{userDetails.user.location}</span>

          </div>

        <div className = "profile-items-container">
            <div className="items-header">
            <h3>Item's you're lending</h3>
            <UsersItemList session={session} />
          
 
       
            </div>

          
       
        </div>
    </div>
  </div>

)
}


export default UserProfile;