import React, { useState } from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";


const Auth = ( {setSession, setAlert} ) => {
  
  const [showLogIn, setShowLogIn] = useState(true);

   if (showLogIn) {
     return <LogIn setShowLogIn={setShowLogIn} setSession={setSession} />
   } else {
     return <SignUp setShowLogIn={setShowLogIn} setAlert={setAlert}/>
   }

}

export default Auth;