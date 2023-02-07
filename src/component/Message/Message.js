function Message() {
  let messages1 = []
  let messages2 = []
  return (
    <div className="messageFeatureDiv">
      <div className="user1Chat">
        <input type="text" className="inputChat">

        </input>
        <button className="sendButton">
            Send
        </button>
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