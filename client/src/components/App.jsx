import React, {useState, useEffect} from "react";
import { BrowserRouter, Route } from 'react-router-dom'
import Header from "./Header/Header";
import UserProfile from "./Users/UserProfile";
import ItemSearch from './Items/ItemSearch';
import Main from './Main'
import Requests from "./Requests/Requests";
import Alert from "./Alert/Alert";
import './App.css'

// If any problems with deployment, consider using HashRouter instead of BrowserRouter
const App = () => {

  const [session, setSession] = useState(false)
  const [alert, setAlert] = useState(false)
  const [refreshItems, setRefreshItems] = useState(false)
  const [profilePic, setProfilePic] = useState(null)
  const [searchItems, setSearchItems] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setSession(JSON.parse(user))
    }

    const profile = localStorage.getItem('userPic')
    if (profile) {
      setProfilePic(JSON.parse(profile))
    }

  }, [])
 

  return (
    <div>
      <BrowserRouter>
        <div>
          <Header setSession={setSession} session={session} setAlert={setAlert} setRefreshItems={setRefreshItems} profilePic={profilePic} />
          <div className="ui container content-field">
            <Route path='/' exact render={() => <Main setSession={setSession} session={session} setAlert={setAlert} refreshItems={refreshItems} setRefreshItems={setRefreshItems} profilePic={profilePic} setSearchItems={setSearchItems}/>}/>
            <Route path='/profile' exact render={() => <UserProfile setSession={setSession} session={session} profilePic={profilePic} setProfilePic={setProfilePic} />}/>
            <Route path='/items/search/:query' exact render={() => <ItemSearch setSession={setSession} session={session} profilePic={profilePic} setProfilePic={setProfilePic} searchItems={searchItems} setSearchItems={setSearchItems} />}/>
            <Route path='/requests' exact render={() => <Requests setSession={setSession} session={session} profilePic={profilePic} setProfilePic={setProfilePic} />} />
          {/* <Route path="*" exact render={() => <Main setSession={setSession} session={session} setAlert={setAlert} refreshItems={refreshItems} setRefreshItems={setRefreshItems} profilePic={profilePic} setSearchItems={setSearchItems}/>} /> */}
          </div>

          <Alert alert={alert} setAlert={setAlert} /> 
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;