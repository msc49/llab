import {useState, useEffect} from "react"
import axios from "axios"

function User() {
  const [users , setNewUsers] = useState(null)
  const [formUser, setFormUser] = useState({
        email: "",
        name: "",
        location: "",
        password: ""
        })
  
useEffect(() => {
  getUsers()
    } ,[])



function getUsers() {
  axios({
      method: "GET",
      url:"/users/",
    }).then((response)=>{
      const data = response.data
      setNewUsers(data)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        }
    })}

function createUser(event) {
  axios({
    method: "POST",
    url:"/users/",
    data:{
      name: formUser.name,
      email: formUser.email,
      location: formUser.location,
      password: formUser.password
      }
  })
  .then((response) => {
    getUsers()
  })

  setFormUser(({
    email: "",
    name: "",
    location: "",
    password: ""}))

  event.preventDefault()
}

function handleChange(event) { 
  const {value, name} = event.target
  setFormUser(prevUser => ({
      ...prevUser, [name]: value})
  )}


  return (
    <div className=''>
    
          <form className="create-user ui form">
          <div className="field">
              <input onChange={handleChange} text={formUser.name} name="name" placeholder="Name" value={formUser.name} />
              </div>
              <div className="field">
              <input onChange={handleChange} text={formUser.email} name="email" placeholder="Email" value={formUser.email} />
              </div>
              <div className="field">
              <input onChange={handleChange} text={formUser.location} name="location" placeholder="Location" value={formUser.location} />
              </div>
              <div className="field">
              <input onChange={handleChange} text={formUser.password} name="password" placeholder="Password" value={formUser.password} />
              </div>
              <button className="ui button" onClick={createUser}>Submit</button>
          </form>
    
    
        </div>
      );


}



export default User;