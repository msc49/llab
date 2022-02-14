import React, {useState, useEffect} from "react";
import { BrowserRouter, Route } from 'react-router-dom'
import Header from "./Header/Header";
import UserProfile from "./Users/UserProfile";
import Main from './Main'
import Alert from "./Alert/Alert";

// If any problems with deployment, consider using HashRouter instead of BrowserRouter
const App = () => {

  const [session, setSession] = useState(false)
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setSession(JSON.parse(user))
    }
  }, [])
 
  console.log('AppSession', session)

  return (
    <div>
      <BrowserRouter>
        <div>
          <Header setSession={setSession} />
          <Route path='/' exact render={() => <Main setSession={setSession} session={session} setAlert={setAlert} />}/>
          <Route path='/profile' exact render={() => <UserProfile />}/>

          <Alert alert={alert} setAlert={setAlert} /> 
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;