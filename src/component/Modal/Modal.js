import React from 'react'
import './Modal.css'

const Modal = ({show, onClose}) => {
  if(!show) return null
  return (
    <div className='modal-main-container'>
        <div className='modal-container'>
          <form className='create-channel-container'>
            <div className='create-channel'>
              Create a new channel.
            </div>
            <input 
              className='text-create-channel' 
              type='text'
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