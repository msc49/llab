import React, {useState} from "react";
import { BrowserRouter, Route } from 'react-router-dom'
import Header from "./Header/Header";
import Main from './Main'
import Alert from "./Alert/Alert";

// If any problems with deployment, consider using HashRouter instead of BrowserRouter
const App = () => {

  const [session, setSession] = useState(false)
  const [alert, setAlert] = useState(false)
 
  console.log('AppSession', session)

  return (
    <div>
      <BrowserRouter>
        <div>
          <Header setSession={setSession} />
          <Route path='/' exact render={() => <Main setSession={setSession} session={session} setAlert={setAlert} />}/>
          <Alert alert={alert} setAlert={setAlert} /> 
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;