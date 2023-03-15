import './Textbox.css'
import ChannelMessage from '../Channels/ChannelMessage';
import UserMessage from '../Users/UserMessage';
import { useEffect } from 'react';

export const Textbox = (props) => {

  const {channelSelected, setChannelMessages, channelMessages, channelId, getChannelMessage, userId, userSelected, userMessageData, placeholder} = props;
  
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser){
      getChannelMessage(channelId);
      console.log('Hello', channelId);
    }
  }, [channelId, setChannelMessages])
  
  return (
    <main className='textbox-main-contianer'>
        <div className='convobox-container'>
          <div className='convo-container'>
            <div className='convo-body'>

              {userSelected ? (
                userMessageData.map(data => (
                <div key={data.id}>
                  <div className='messageTop'>
                    <p className='messageUser'>
                        {data.sender ? data.sender.uid.split('@')[0] : 'User'}
                    </p>
                    <p className='messageDate'>{data.created_at}</p>
                  </div>
                  <p className='messageBody'>{data.body}</p>
                </div>
              ))
              ) : null}

              {channelMessages && channelSelected ? (
                channelMessages.length > 0 ? (
                  channelMessages.map(data => (
                    <div className='messageContainer' key={data.id}>
                      <div className='messageTop'>
                        <p className='messageUser'>
                        {data.sender ? data.sender.uid.split('@')[0] : 'User'}
                        </p>
                        <p className='messageDate'>{data.created_at}</p>
                      </div>
                      <p className='messageBody'>{data.body}</p>
                    </div>
                  ))
                ) : (
                  <p className='messageContainer'>No messages to show here. Start the conversation!</p>
                )
              ): <p className='messageContainer'>Select a Channel or User</p>}
              
              {channelSelected ? 
                <ChannelMessage
                  channelMessages={channelMessages}
                  setChannelMessages={setChannelMessages}
                  channelId={channelId} 
                  getChannelMessage={getChannelMessage}
                  placeholder={placeholder}
                /> 
                : 
              null}

              {userSelected ? 
              <UserMessage 
                userId={userId}
                placeholder={placeholder}
              />
              :
              null}
              
            </div>

          </div>
            
        </div>
    </main>
  )
}
