import React from "react";
import Auth from "./Users/Auth";
import ItemList from "./Items/ItemList";

const Main = ( {session, setSession, setAlert, refreshItems, setRefreshItems, profilePic, setSearchItems} ) => {
   
   if (session) {
     return <ItemList session={session} refreshItems={refreshItems} setRefreshItems={setRefreshItems} profilePic={profilePic} setSearchItems={setSearchItems} />
   } 

   return (
    <Auth session={session} setSession={setSession} setAlert={setAlert} />
   )
}

export default Main;
