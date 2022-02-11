import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import ItemList from "./ItemList";
import UserSignUp from './Users/Sign_up'
import UserLogIn from "./Users/Log_in";
import Header from "./Header/Header";

// If any problems with deployment, consider using HashRouter instead of BrowserRouter
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={UserSignUp} />
          <Route path="/login" exact component={UserLogIn} />
          <Route path="/items" exact component={ItemList} />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;