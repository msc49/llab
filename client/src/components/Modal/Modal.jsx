import React from 'react'
import './Modal.css'

const Modal = ({modalOpen, children}) => {
  if (!modalOpen) return null
  return (
    <div id="my-modal">
      {children}
    </div>
  )
}

export default Modal
