import {useState, useEffect} from "react"
import './Users.css';
import express from "../../apis/express";

const UserLogIn = () => {

  const [formUser, setFormUser] = useState({
    username: "",
    password: ""
  })


const authenticateUser = async (event) => {
  event.preventDefault()
  const { data } = await express.post('/login', {
  login: {
    password: formUser.password,
    username: formUser.username
  }
})
  console.log(data)
}

function handleChange(event) { 
  const {value, name} = event.target
  setFormUser(prevUser => ({
  ...prevUser, [name]: value})
)}
  
  return (
    <div className="user-form ui middle aligned center aligned grid">
    <div className="column">
  
    <h2 className="ui teal image header">
      <div className="content">
        Log in to your account
      </div>
    </h2>
          <form onSubmit={authenticateUser} className="ui large form">

              <div className="field">
               <div className="ui left icon input">
                <i className="user icon"></i>
                <input onChange={handleChange} text={formUser.username} name="username" placeholder="Username" value={formUser.username} required/>
               </div>
              </div> 
  
              <div className="field">
               <div className="ui left icon input">
                <i className="lock icon"></i>
                <input type="password" onChange={handleChange} text={formUser.password} name="password" placeholder="Password" value={formUser.password} />
               </div>
              </div> 

              <button className="ui green button">Log in</button>

          </form>
  
   </div>
  </div>
  
        
      );
}

export default UserLogIn
