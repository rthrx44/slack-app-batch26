import React from 'react'
import './Textbox.css'
import { RiMailSendLine } from "react-icons/ri";

export const Textbox = (props) => {

  const {channelSelected, channelData} = props;
  
  return (
    <main className='textbox-main-contianer'>
        <div className='convobox-container'>
          <div className='convo-container'>
            <div className='convo-body'>
              {channelSelected ? (
                channelData.length > 0 ? (
                  channelData.map((data) => (
                    <div key={data.id}>
                      <p className='messageBody'>{data.body}</p>
                      <p className='messageDate'>Date sent: {data.created_at}</p>
                    </div>
                  ))
                ) : (
                  <p className='messageBody'>No messages to show here. Start the conversation!</p>
                )
              ): (
                <p className='messageBody'>Select a Channel</p>
              )}

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
            
        </div>
    </main>
  )
}
