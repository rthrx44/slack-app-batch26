import './Textbox.css'
import ChannelMessage from '../Channels/ChannelMessage';

export const Textbox = (props) => {

  const {channelSelected, channelData, channelId, getChannelMessage} = props;
  
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
              
              {channelSelected ? 
                <ChannelMessage 
                  channelId={channelId} 
                  getChannelMessage={getChannelMessage}
                /> 
                : 
              null}
              
            </div>

          </div>
            
        </div>
    </main>
  )
}
