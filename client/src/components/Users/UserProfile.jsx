import React from 'react'
import ItemList from '../Items/ItemList';
import avatar from "../images/user-avatar.jpeg";


const UserProfile = () => {


const userDetails = JSON.parse(localStorage.getItem('user')) 


return (
  <div className="ui container"> 
     <div className="profile-wrapper">
        <div className="user-info-container">
              <div className="avatar-container">
                <img alt="user profile" className="avatar" src={avatar}></img>
              </div>
                <span className="profile-username">{userDetails.user.username}</span>
          </div>

        <div className = "profile-items-container">
            <div className="items-header">
            <h3>Item's you're lending</h3>
            <ItemList />
          
 
       
            </div>

          
       
        </div>
    </div>
  </div>

)
}


export default UserProfile;