import React from 'react'
import './Modal.css'

const Modal = ({show, onClose}) => {
  if(!show) return null

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  
  return (
    <div className='modal-main-container' onClick={onClose} >
        <div className='modal-container' onClick={(e) => e.stopPropagation()}>
          <form className='create-channel-container' onSubmit={handleSubmit}>
            <div className='create-channel'>
              Create a new channel.
            </div>
            <input 
              className='text-create-channel' 
              placeholder='Write something in here...'
            />
            <div className='modal-buttons'>
              <button className='cancel-btn' onClick={onClose}>Cancel</button>
              <button className='create-btn'>Create</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Modal