import React from "react";
import Auth from "./Users/Auth";
import ItemList from "./Items/ItemList";

const Main = ( {session, setSession, setAlert, refreshItems, setRefreshItems} ) => {
   
   if (session) {
     return <ItemList session={session} refreshItems={refreshItems} setRefreshItems={setRefreshItems} />
   } 

   return (
    <Auth session={session} setSession={setSession} setAlert={setAlert} />
   )
}

export default Main;
