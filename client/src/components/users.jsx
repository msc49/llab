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
                <i className="inbox icon"></i>
                <input onChange={handleChange} text={formUser.email} name="email" placeholder="Email" value={formUser.email} />
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