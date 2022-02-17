
import React from 'react'
import UsersItemList from '../Items/UsersItemsList';
import testImage from "../images/linda.jpeg";
import './UserProfile.css'
import express from '../../apis/express';



const UserProfile = ({ session, setSession }) => {
const userDetails = JSON.parse(localStorage.getItem('user'));

const changeProfilePic = async (event) => {
  const { id } = userDetails.user
  if(event.target.files) {

    const userImage = event.target.files[0]
    let formData = new FormData()
      formData.append('userImage', userImage)
  
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
         
            <img alt="user profile" className="avatar" src={session ? session.user.image : testImage}></img>

            <form className="ui large form my-modal-form" encType='multipart/form-data' noValidate>
              <div id="pic-button-container" className="ui center aligned container">
                <label htmlFor="file-upload" className="custom-file-upload blue">
                  <i className="camera white icon"></i>choose picture
                </label>
                <input onChange={changeProfilePic} id="file-upload" name="imageFile" type="file" accept="image/*"/>
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
