import React from 'react'
import './Channels.css'
import { FaTimes } from 'react-icons/fa';

const Channels = () => {
  return (
    <div className='channel-main-container'>
      <div className='channel-container'>
        Batch 26 Channel
      </div>
      <div className='delete-con'>
        <FaTimes className='delete-btn'/>
      </div>
    </div>
  )
}

export default Channels