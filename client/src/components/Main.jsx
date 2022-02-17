import React from "react";
import Auth from "./Users/Auth";
import ItemList from "./Items/ItemList";

const Main = ( {session, setSession, setAlert, refreshItems, setRefreshItems, setSearchItems} ) => {
   
  return session ? <ItemList session={session} refreshItems={refreshItems} setRefreshItems={setRefreshItems} setSearchItems={setSearchItems} setAlert={setAlert} />
  : <Auth session={session} setSession={setSession} setAlert={setAlert} />
 
}

export default Main;
