import React, { useState, useEffect } from 'react'
import './Channels.css'
import { FaTimes } from 'react-icons/fa';

const Channels = () => {

  const url = 'http://206.189.91.54/api/v1/';

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const [channelArr, setChannelArr] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [client, setClient] = useState('');
  const [expiry, setExpiry] = useState('');
  const [uid, setUid] = useState('');

  useEffect(() => {
    if(currentUser){
      setAccessToken(currentUser.currentUserAuthData.accessToken);
      setClient(currentUser.currentUserAuthData.client);
      setExpiry(currentUser.currentUserAuthData.expiry);
      setUid(currentUser.currentUserAuthData.uid);
    }
  }, [currentUser]);

  const getChannels = async () => {
    try{
      const response = await fetch(`${url}/channels`,
      {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
          'access-token' : accessToken,
          'client' : client,
          'expiry' : expiry,
          'uid' : uid
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

  console.log(channelArr);

  return (
    <>

    {channelArr.map((channel) => (
      <div className='channel-main-container' key={cha.id}>
      <div className='channel-container'>
        <p>{channel.name}</p>
        <FaTimes className='delete-btn' onClick={getChannels} />
      </div>
    </div>
    ))}

    <div className='channel-main-container'>
      <div className='channel-container'>
        <p>Batch 26 Channel</p>
        <FaTimes className='delete-btn' onClick={getChannels} />
      </div>
    </div>
    </>
  )
}

export default Channels