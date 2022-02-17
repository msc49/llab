import React, { useEffect } from "react";
import './Alert.css'

const Alert = ({ alert, setAlert }) => {

  useEffect(() => {

    if (alert) {
      const flash = document.querySelector('.flash-alert')
      if (flash) {
        flash.style.display = 'block'
        flash.style.bottom = '0px';
        flash.style.opacity = '1';
      }

      let showTimeout;
  
      let fadeTimeout = setTimeout(() => {
        if (flash) {
          flash.style.bottom = '-50px';
          flash.style.opacity = '0';

          showTimeout = setTimeout(() => {
            if (flash) {
              flash.style.display = 'none';
              setAlert(false)
            }
          }, 4000)

        }
      }, 3000)
  
      return () => {
        setAlert(false)
        const flash = document.querySelector('.flash-alert')
        clearTimeout(fadeTimeout)
        clearTimeout(showTimeout)
        if (flash) {
          flash.style.opacity = '0';
          flash.style.bottom = '-50px';
          flash.style.display = 'none'
        }
      }
    }

  }, [alert, setAlert])
  
    return (
      <div className={`ui ${alert.type} center aligned message flash-alert`}>
        <i className="close icon"></i>
        <div className="header">
          {alert.header}
        </div>
        {
          alert.event === 'SIGN_UP' ? <p>Hi <b>{alert.username}</b>, log-in to see what's on offer <em data-emoji="gift"></em> in {alert.location ? <b>{alert.location}</b> : 'your area'}!</p> :
          alert.event === 'LOG_IN' ? <p><b>You're in!</b> Browse free items in {alert.location ? <b>{alert.location}</b> : 'your area'}, and help your community by lending your unused goods <em data-emoji="angel"></em></p> : 
          alert.event === 'ADD_ITEM' ? <p><b>You've made your {alert.itemName}</b> available to borrow by people in {alert.location ? <b>{alert.location}</b> : 'your area'}!</p> :  
          alert.event === 'REQUEST_ITEM' ? <p><b>{alert.lender}</b> has been notified of your request to borrow their <b>{alert.itemName}</b>. Please wait for their response.</p> : ""
        }
      </div>
    )
 
}

export default Alert