import React, { useState, useEffect, useCallback } from 'react'
import './Channels.css'
import { FaQuestionCircle, FaPlusCircle } from 'react-icons/fa';

const Channels = (props) => {

  const {channelArr, setChannelArr, channelCreated} = props;

  const baseURL = process.env.REACT_APP_BASE_URL;
  
  const [isLoading, setIsLoading] = useState(true);

  const getChannels = useCallback(async (currentUser) => {
    try{
      const response = await fetch(`${baseURL}/channels`,
      {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
          'access-token' : currentUser.accessToken,
          'client' : currentUser.client,
          'expiry' : currentUser.expiry,
          'uid' : currentUser.uid
        }
      });
      const data = await response.json();
      if(data.errors === 'No available channels.'){
        setIsLoading(false);
        return;
      }
      setChannelArr(data.data);
      setIsLoading(false);
      console.log(data);
    }catch(error){
      console.error(error);
      alert(error.message);
    }
  }, [baseURL, setChannelArr]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser){
      getChannels(currentUser.currentUserAuthData);
    }
  }, [channelCreated, getChannels]);

  return (
    <>

    {!isLoading ?
      channelArr.length > 0 ?
        channelArr.map((channel) => (
        <div className='channel-main-container' key={channel.id}>
          <div className='channel-container'>
            <p>{channel.name}</p>
            <div className="channel-actions">
              <FaQuestionCircle className='question-btn' />
              <FaPlusCircle className='question-btn' />
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