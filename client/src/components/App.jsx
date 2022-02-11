import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import ItemList from "./ItemList";
import User from './users'
import Header from "./Header/Header";

const PageOne = () => {
    return (
      <div>
       PageOne
       <Link to='/pagetwo'>Navigate to page 2</Link>
      </div>
    )
   
};

const PageTwo = () => {
  return (
    <div>
      PageTwo
      <Link to='/'>Navigate to page 1</Link>
    </div>
  )
 
}
// If any problems with deployment, consider using HashRouter instead of BrowserRouter
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={User} />
          <Route path="/items" exact component={ItemList} />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;