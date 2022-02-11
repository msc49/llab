import {useState, useEffect} from "react"
import './Users.css';
import express from "../../apis/express";

function User() {
  const [formUser, setFormUser] = useState({
        email: "",
        name: "",
        username: "",
        location: "",
        password: ""
        })


const createUser = async (event) => {
  event.preventDefault()
  const { data } = await express.post('/users', {
    user: {
      name: formUser.name,
      email: formUser.email,
      location: formUser.location,
      password: formUser.password,
      username: formUser.username
    }
  })
  console.log(data)
  // getItems()
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
        Create an account
      </div>
    </h2>
          <form className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
               <div className="ui left icon input">
                <i className="user icon"></i>
               <input type="text" onChange={handleChange} text={formUser.name} name="name" placeholder="Name" value={formUser.name} />
               </div>
              </div> 

              <div className="field">
               <div className="ui left icon input">
                <i className="user icon"></i>
                <input onChange={handleChange} text={formUser.username} name="username" placeholder="Username" value={formUser.username} required/>
               </div>
              </div> 

              <div className="field">
               <div className="ui left icon input">
                <i className="inbox icon"></i>
                <input onChange={handleChange} text={formUser.email} name="email" placeholder="Email" value={formUser.email} required/>
               </div>
              </div> 


              <div className="field">
               <div className="ui left icon input">
                <i className="home icon"></i>
                <input onChange={handleChange} text={formUser.location} name="location" placeholder="Location" value={formUser.location} />
               </div>
              </div> 

              <div className="field">
               <div className="ui left icon input">
                <i className="lock icon"></i>
                <input type="password" onChange={handleChange} text={formUser.password} name="password" placeholder="Password" value={formUser.password} />
               </div>
              </div> 


              <button className="ui green button" onClick={createUser}>Sign up</button>
            </div>
          </form>

   </div>
</div>

        
      );


}




export default User;