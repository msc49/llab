
import React, { useState } from 'react'
import UsersItemList from '../Items/UsersItemsList';
import testImage from "../images/linda.jpeg";
import './UserProfile.css'
import express from '../../apis/express';



const UserProfile = ({ session, setSession }) => {

const userDetails = JSON.parse(localStorage.getItem('user'));

const [profilePic, setProfilePic] = useState(null)

const changeProfilePic = async (event) => {
  event.preventDefault()
  console.log(profilePic)
  const { id } = userDetails.user
  if(profilePic) {
    let formData = new FormData()
      formData.append('userImage', profilePic)
  
      try {
        const { data: { image } } = await express.put(`/users/${id}/images`, formData)
        const user = JSON.parse(localStorage.getItem('user'))
        user['user']['image'] = image
        localStorage.setItem('user', JSON.stringify(user))
        setSession(JSON.parse(localStorage.getItem('user')))
      } catch(err) {
        console.log(err)
      }

  }

}
  
return (
  <div className="ui container profile"> 
    <div className="profile-meta">
       <div className="avatar-container">
         
            <img alt="user profile" className="avatar" src={session && session.user.image ? session.user.image : testImage}></img>

            <form onSubmit={changeProfilePic} className="ui large form" encType='multipart/form-data' noValidate>
              <div id="pic-button-container" className="ui center aligned container">
                <label htmlFor="file-upload" className="custom-file-upload blue">
                  <i className="camera white icon"></i>choose picture
                </label>
                <input onChange={(event) => setProfilePic(event.target.files[0])} id="file-upload" name="imageFile" type="file" accept="image/*"/>
      
                <p></p>
                <p></p>
                <div>
                  <button className='ui mini blue basic button'>Submit</button>
                </div>
              </div>
            </form>


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
