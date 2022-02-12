import React from "react";
import Auth from "./Users/Auth";
import ItemList from "./Items/ItemList";

const Main = ( {session, setSession, setAlert} ) => {
   
   if (session) {
     return <ItemList session={session} />
   } 

   return (
    <Auth session={session} setSession={setSession} setAlert={setAlert} />
   )
}

export default Main;
