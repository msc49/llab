import React from 'react'
import UsersItemList from '../Items/UsersItemsList';
import avatar from "../images/user-avatar.jpeg";
import testImage from "../images/linda.jpeg";




const UserProfile = (session) => {


const userDetails = JSON.parse(localStorage.getItem('user'));
console.log(userDetails)



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
         <div className = "profile-items-header">
            <h3 className="items-heading">Item's you're lending</h3>
          <div className="btn-container">
            <button className="ui button green">Lending</button>
            <button className="ui button grey">Borrowing</button>
          </div>
           
         </div>

            <UsersItemList session={session} />
      </div>
  </div>

   /* <div className="profile-wrapper">
        <div className="user-info-container">
              <div className="avatar-container">
                <img alt="user profile" className="avatar" src={testImage}></img>
              </div>

              <div className="profile-meta">
                <span className="profile-username">{userDetails.user.username}</span>
                <span className="profile-location">{userDetails.user.location}</span>
                <span className="profile-date">Lending and borrowing <br></br> since 2022</span>
              </div>
           

          </div>

        <div className = "profile-items-container">
            <div className="items-header">
            <h3>Item's you're lending</h3>
            <UsersItemList session={session} />
        </div>
        </div> */

)
}


export default UserProfile;