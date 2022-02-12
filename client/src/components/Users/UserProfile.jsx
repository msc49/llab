import React, { useState } from 'react'
import express from "../../apis/express";
import avatar from "../images/user-avatar.jpeg";


const UserProfile = () => {


const userDetails = JSON.parse(localStorage.getItem('user')) 


return (
  <div className="ui container"> 
     <div className="profile-header">
       <div className="avatar-container">
       <img className="profile-avatar" src={avatar}></img>

       </div>

       <div className="name-container">    
       <h1>{userDetails.user.username}</h1>
       </div>
       <div className="button-container"></div>


     </div>


    <div>Items

   
    </div>
  </div>

)
}


export default UserProfile;