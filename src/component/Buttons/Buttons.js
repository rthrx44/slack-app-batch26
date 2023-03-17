import React from 'react'
import './Buttons.css'

export const CloseButton = ({onClickClose}) => {
  return (
    <div className="close-container" >
      <button
        onClick={onClickClose}
        className="btn-close"
      >
        <p className='close-btn'>Close</p>
      </button>
    </div>
  )
}