import React from 'react'
import './addItemModal.css'

const AddItemModal = ({modalOpen, children}) => {
  if (!modalOpen) return null
  return (
    <div id="my-modal">
      {children}
    </div>
  )
}

export default AddItemModal
