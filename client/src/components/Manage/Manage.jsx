import React, { useState } from "react";
import Requests from "./Requests";
import Loans from "./Loans";


const Manage = ( {session, setAlert} ) => {
  
  const [showLoans, setShowLoans] = useState(false);
    return showLoans ? <Loans session={session} setShowLoans={setShowLoans} setAlert={setAlert} /> 
    : <Requests session={session} setShowLoans={setShowLoans} setAlert={setAlert} />  
}

export default Manage;