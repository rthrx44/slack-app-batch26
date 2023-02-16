// import { useState } from "react"
// import { useEffect } from 'react'
import React from 'react'
import './Message.css'
import LoginButton from './LoginButton'

const Message = () => {
//   const messagesURL = "http://206.189.91.54/api/v1/messages"
  
  // const [variable, setVariableState] = useState("huh?")

  let user = {
    "email": "chibby@mail.com",
    "password": "chibby1234"
  }
  
  // const messageSend = async () => {
  //   let response = await fetch(messagesURL)

  //   console.log(response)
  // }
  
  // messageSend()

  return (
    <div className="messageFeatureDiv">
      <div className="user1Chat">
        <input type="text" className="inputChat">

        </input>
        <button className="sendButton">
            Send
        </button>
        <LoginButton userchibby={user} />
      </div>
      <div className="sharedChatBox">
        
      </div>
      <div className="user2Chat">
        <input type="text" className="inputChat">

        </input>
        <button className="sendButton">
            Send
        </button>
      </div>
    </div>
  )

}

export default Message