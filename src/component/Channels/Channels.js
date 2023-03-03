import React, { useState, useEffect } from 'react'
import './Channels.css'
import { FaTimes } from 'react-icons/fa';

const Channels = () => {

  const url = 'http://206.189.91.54/api/v1/';

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const [channelArr, setChannelArr] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(currentUser){
      getChannels(currentUser.currentUserAuthData);
    }
  }, []);

  const getChannels = async (currentUser) => {
    try{
      const response = await fetch(`${url}/channels`,
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
      setChannelArr(data.data);
      console.log(channelArr[0].name);
      // console.log(data);
    }catch(error){
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <>

    {!isLoading ? 
      channelArr.map((channel) => (
        <div className='channel-main-container' key={channel.id}>
        <div className='channel-container'>
          <p>{channel.name}</p>
          <FaTimes className='delete-btn' />
        </div>
      </div>
    )) : 
    'Loading...'}
    {/* Sir for the loading pwede niyo i-customize to your liking ano itsura niya */}
    
    </>
  )
}

export default Channels