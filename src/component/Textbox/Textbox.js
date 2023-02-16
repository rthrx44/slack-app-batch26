import React from 'react'
import './Textbox.css'
import { RiMailSendLine } from "react-icons/ri";

export const Textbox = () => {
  return (
    <main className='textbox-main-contianer'>
        <div className='convobox-container'>
          <div className='convo-container'>
            <div className='convo-body'>
              Convo Body
            </div>
          </div>
          <div className='text-container'>
            <div className='text-box'>
              <form className='message-field'>
                <input 
                  className='input-field'
                  type="text"
                  placeholder='Send a message...'
                  />
                <RiMailSendLine className='send-btn'/>
              </form>
            </div>
          </div>  
        </div>
    </main>
  )
}
