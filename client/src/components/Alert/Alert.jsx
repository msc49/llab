import React, { useEffect } from "react";
import './Alert.css'

const Alert = ({ alert, setAlert }) => {

  useEffect(() => {
    let showTimeout;
    let fadeTimeout;

    if (alert) {
      const flash = document.querySelector('.flash-alert')

      if (flash) {
        flash.style.display = 'block'
        flash.style.bottom = '0px';
        flash.style.opacity = '1';
      }
  
        fadeTimeout = setTimeout(() => {
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
    }
      return () => {
        const flash = document.querySelector('.flash-alert')
        clearTimeout(fadeTimeout)
        clearTimeout(showTimeout)
        if (flash) {
          flash.style.opacity = '0';
          flash.style.bottom = '-50px';
          flash.style.display = 'none'
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
          alert.event === 'REQUEST_ITEM' ? <p><b>{alert.lender}</b> has been notified of your request to borrow their <b>{alert.itemName}</b>. Please wait for their response.</p> : 
          alert.event === 'DECLINE_REQUEST' ? <p><b>You declined {alert.requester}'s</b> request to borrow your <b>{alert.itemName}</b> <em data-emoji="sob"></em></p> : 
          alert.event === 'APPROVE_REQUEST' ? <p><b>You approved {alert.requester}'s</b> request to borrow your <b>{alert.itemName}</b> <em data-emoji="tada"></em></p> :
          alert.event === 'REMOVE_REQUEST' ? <p>You removed your request for <b>{alert.lenders}'s {alert.itemName}</b>. We hope you find something else you like soon! <em data-emoji="sweat_smile"></em></p> : 
          alert.event === 'RETURN_REQUEST' ? <p>You have requested to return <b>{alert.lenders}'s {alert.itemName}</b>. Please wait a few days for the lender to approve this. Thanks for lending and borrowing! <em data-emoji="gift_heart"></em></p> : 
          alert.event === 'CONFIRM_RETURN' ? <p>You have confirmed <b>{alert.borrower}'s request to return your {alert.itemName}</b>. Thanks for lending and borrowing! <em data-emoji="angel"></em></p> : ""
        }
      </div>
    )
 
}

export default Alert