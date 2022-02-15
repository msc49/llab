
import React, {useState, useEffect} from 'react'
import UsersItemList from '../Items/UsersItemsList';
import avatar from "../images/user-avatar.jpeg";
import testImage from "../images/linda.jpeg";
import './UserProfile.css'
import express from '../../apis/express';



const UserProfile = (session) => {

  const [userProfilePic, setUserProfilePic] = useState(null)

  useEffect(() => {
    const userPic = localStorage.getItem('userPic')
    if (userPic) {
      setUserProfilePic(JSON.parse(userPic))
    }
  }, [])

const userDetails = JSON.parse(localStorage.getItem('user'));

console.log('local storage', userDetails)

const changeProfilePic = async (event) => {
  const { id } = userDetails.user
  console.log('profile pic change request')
  if(event.target.files) {

    const userImage = event.target.files[0]
    let formData = new FormData()
      formData.append('userImage', userImage)
  
      try {
        const { data } = await express.put(`/users/${id}/images`, formData)
        
        const userPicture = data.images.slice(-1)

        localStorage.setItem('userPic', JSON.stringify(userPicture))
      
        const userPic = JSON.parse(localStorage.getItem('userPic'));

        console.log('USER_PIC', userPic[0].path)
        
      } catch(err) {
        console.log(err)
      }

  }


}
  
return (
  <div className="ui container profile"> 
    <div className="profile-meta">
       <div className="avatar-container">
         
            <img alt="user profile" className="avatar" src={userProfilePic ? userProfilePic[0].path : testImage}></img>

            <form className="ui large form my-modal-form" encType='multipart/form-data' noValidate>
              <div id="pic-button-container" className="ui center aligned container">
                <label for="file-upload" class="custom-file-upload">
                  <i class="upload green icon"></i> Upload image
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
