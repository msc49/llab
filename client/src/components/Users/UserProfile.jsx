
import React from 'react'
import UsersItemList from '../Items/UsersItemsList';
import avatar from "../images/user-avatar.jpeg";
import testImage from "../images/linda.jpeg";



const UserProfile = (session) => {

 const userDetails = JSON.parse(localStorage.getItem('user'));
  
return (
  <div className="ui container profile"> 
    <div className="profile-meta">
       <div className="avatar-container">
          <img alt="user profile" className="avatar" src={testImage}></img>
       </div>

       <div className="user-details">
          <span className="profile-username">{userDetails.user.username}</span>
          <span className="profile-location">{userDetails.user.location}</span>
          <span className="profile-date"><em>Lending and borrowing since 2022</em></span>
        </div>
    </div>

    <div className = "profile-items-container">
            <UsersItemList session={session} />
      </div>
  </div>
)
}


export default UserProfile;
