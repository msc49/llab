import React from "react";
import { BrowserRouter, Route} from 'react-router-dom'
import ItemList from "./ItemList";
import SignUp from './Users/Sign_up'
import Login from './Users/Log_in'
import Header from "./Header/Header";

// If any problems with deployment, consider using HashRouter instead of BrowserRouter
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={SignUp} />
          <Route path="/login" exact component={Login} />
          <Route path="/items" exact component={ItemList} />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;