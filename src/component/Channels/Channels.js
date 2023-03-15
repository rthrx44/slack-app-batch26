import React from 'react'
import './Channels.css'
import { FaQuestionCircle, FaPlusCircle } from 'react-icons/fa';

const Channels = (props) => {

  const {channelArr, isLoading, getChannelMessage, getChannelDetail, handleChannelSelect, setShowUserChannelModal, setChannelInfoModal} = props;

  return (
    <>

    {!isLoading ?
      channelArr.length > 0 ?
        channelArr.map((channel) => (
        <div className='channel-main-container' key={channel.id}>
          <div className='channel-container'>
          <p onClick={() => {
            getChannelDetail(channel.id);
            getChannelMessage(channel.id);
            handleChannelSelect();
          }}>{channel.name}</p>
            <div className="channel-actions">
              <FaQuestionCircle 
                className='action-btn' 
                onClick={() => {
                getChannelDetail(channel.id);
                setChannelInfoModal(true);
                }}
              />
              <FaPlusCircle 
                className='action-btn'
                onClick={() => {
                  setShowUserChannelModal(true); 
                  getChannelDetail(channel.id);
                }}    
              />
            </div>
          </div>
        </div>
        ))
      : null
    : 'Loading...'}

    </>
  )
}

export default Channels