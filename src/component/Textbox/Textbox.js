import './Textbox.css'
import ChannelMessage from '../Channels/ChannelMessage';
import UserMessage from '../Users/UserMessage';
import { useEffect } from 'react';

export const Textbox = (props) => {

  const {channelSelected, setChannelMessages, channelMessages, userMessages, setUserMessages, channelId, getChannelMessage, getDirectMessage, userId, userSelected, placeholder} = props;
  
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser){
      getChannelMessage(channelId);
      console.log('Hello', channelId);
    }
  }, [channelId, setChannelMessages])

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser){
      getDirectMessage(userId);
      console.log('Hello', userId);
    }
  }, [userId, setUserMessages])
  
  return (
    <main className='textbox-main-contianer'>
        <div className='convobox-container'>
          <div className='convo-container'>
            <div className='convo-body'>

            {(userSelected || channelSelected) ? (
              <>
              {userSelected && userMessages?.length ? (
                userMessages.map(data => (
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
              channelSelected && channelMessages?.length ? (
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
              )}
              </>
            ) : (
            <p className='messageContainer'>Select a Channel or User</p>
            )}

            {channelSelected ? 
              <ChannelMessage
                channelMessages={channelMessages}
                setChannelMessages={setChannelMessages}
                channelId={channelId} 
                placeholder={placeholder}
              /> 
              : 
            null}

            {userSelected ? 
              <UserMessage 
                userMessages={userMessages}
                setUserMessages={setUserMessages}
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
