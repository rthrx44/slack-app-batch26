import React, { useState, useEffect, useCallback } from 'react'
import './Channels.css'
import { FaQuestionCircle, FaPlusCircle } from 'react-icons/fa';

const Channels = (props) => {

  const {channelArr, setChannelArr, channelCreated} = props;

  const baseURL = process.env.REACT_APP_BASE_URL;
  
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Retrieve Channel Messages
  const getChannelMessage = async (channelId) => {
    try{
      const response = await fetch(`${baseURL}/messages?receiver_id=${channelId}&receiver_class=Channel`, 
      {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
          'access-token' : currentUser.currentUserAuthData.accessToken,
          'client' : currentUser.currentUserAuthData.client,
          'expiry' : currentUser.currentUserAuthData.expiry,
          'uid' : currentUser.currentUserAuthData.uid
        }
      });
      const data = await response.json();
      console.log(data); // Replace with actual UI showing conversation in the textbox
    }catch(error){
      console(error.message);
      alert(alert.message);
    }
  }

  // Get Channel Detail
  const getChannelDetail = async (channelId) => {
    try {
      const response = await fetch(`${baseURL}/channels/${channelId}`, {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
          'access-token' : currentUser.currentUserAuthData.accessToken,
          'client' : currentUser.currentUserAuthData.client,
          'expiry' : currentUser.currentUserAuthData.expiry,
          'uid' : currentUser.currentUserAuthData.uid
        }
      });
      const data = await response.json();
      console.log(data); // Replace with actual UI showing Channel Details (Could be a modal)
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }  

  // Get All Channels
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
            <p onClick={() => getChannelMessage(channel.id)}>{channel.name}</p>
            <div className="channel-actions">
              <FaQuestionCircle 
                className='question-btn' 
                onClick={() => getChannelDetail(channel.id)}
              />
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