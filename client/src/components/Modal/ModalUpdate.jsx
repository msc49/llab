import React from 'react'
import './ModalUpdate.css'

const ModalUpdate = ({modalUpdateOpen, children}) => {
  if (!modalUpdateOpen) return null
  return (
    <div id="my-modal">
      {children}
    </div>
  )
}

export default ModalUpdate
