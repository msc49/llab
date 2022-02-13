import React, { useEffect } from "react";
import './Alert.css'

const Alert = ({ alert, setAlert }) => {
  console.log('alert', alert)
  console.log('alert', alert)
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
        <p>Hi, <b>{alert.username}</b>, log-in to see what's on offer in <b>{alert.location ? alert.location : 'your area'}</b>!`</p>
      </div>
    )
 
}

export default Alert