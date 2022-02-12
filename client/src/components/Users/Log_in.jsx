import {useState} from "react"
import './Users.css';
import express from "../../apis/express";

function Log_in() {
  const [formUser, setFormUser] = useState({
        email: "",
        name: "",
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
       Log into your account
      </div>
    </h2>
          <form className="ui large form">
            <div className="ui stacked segment">
          
          

              <div className="field">
               <div className="ui left icon input">
                <i className="inbox icon"></i>
                <input onChange={handleChange} text={formUser.email} name="email" placeholder="Email" value={formUser.email} required/>
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




export default Log_in;