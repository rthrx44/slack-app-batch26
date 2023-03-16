import React from 'react'
import { FaTimes } from "react-icons/fa";
import './Buttons.css'

export const CloseButton = ({onClickClose}) => {
  return (
    <div className="close-container" >
      <button
        onClick={onClickClose}
        className="btn-close"
      >
        <FaTimes className='close-btn' />
      </button>
    </div>
  )
}