import React, { useEffect, useState } from 'react'
import './Modal.css'

const Modal = (props) => {

  const {users, showChannelModal, setShowChannelModal, showUsersModal, setShowUsersModal, setChannelCreated, addedUsers, setAddedUsers} = props;

  const baseURL = process.env.REACT_APP_BASE_URL;

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const [channelName, setChannelName] = useState('');
  const [userIds, setUserIds] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  
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

  useEffect(() => {
    localStorage.setItem('addedUsers', JSON.stringify(addedUsers));
  }, [addedUsers]);

  // Create Channel
  const createChannel = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/channels`,
        {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
            'access-token' : accessToken,
            'client' : client,
            'expiry' : expiry,
            'uid' : uid
          },
          body: JSON.stringify({
            name: channelName,
            user_ids: userIds
          }),
        }
      );
      const data = await response.json();

      if(data.errors){
        alert(`${data.errors[0]}`);
        return;
      }

      if(channelName.length > 15){
        alert(`${data.errors[0]}`);
        return;
      }
      if(!channelName){
        alert(`${data.errors[0]}`);
        return;
      }
      if(channelName.length >= 0 && channelName.length <= 2){
        alert(`${data.errors[0]}`);
        return;
      }

      console.log(data);
      alert(`${channelName} created!`);
      setChannelName('');
      setUserIds([]);
      setShowChannelModal(false);
      setChannelCreated(true);

    }catch(error){
      console.error(error);
      alert(error.message);
    }
  }

  const checkEmailExists = (e) => {
    e.preventDefault();
    const existingUser = users.find(user => user.uid === userEmail)
    
    if(existingUser){
      setAddedUsers([...addedUsers, existingUser]);
      console.log('Exists!')
      setUserEmail('');
      setShowUsersModal(false);
      return
    }
    
    console.log('Does not exist!')
  }

  return (
    <>
    {showChannelModal && (
    <div className='channel-modal'>
      <div className='modal-main-container'>
          <div className='modal-container'>

            <form className='create-channel-container' onSubmit={createChannel}>
              <div className='create-channel'>
                Create a new channel.
              </div>

                <input 
                  className='text-create-channel' 
                  type='text'
                  placeholder='Enter Channel Name'
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                />

                <input 
                  className='text-create-channel' 
                  type='text'
                  placeholder='Enter user IDs separated by comma'
                  value={userIds}
                  onChange={(e) => setUserIds(e.target.value.split(','))}
                  multiple
                />

              <div className='modal-buttons'>
                <button className='create-btn' type='submit'>Create</button>
                <button className='cancel-btn' onClick={() => setShowChannelModal(false)}>Cancel</button> 
              </div>
            </form>

          </div>
      </div>
    </div>
    )}

    {showUsersModal && (
    <div className='users-modal'>
      <div className='modal-main-container'>
          <div className='modal-container'>

            <form className='create-channel-container' onSubmit={checkEmailExists}>
              <div className='create-channel'>
                Add a user
              </div>

                <input 
                  className='text-create-channel' 
                  type='text'
                  placeholder='Enter user email'
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />

              <div className='modal-buttons'>
                <button className='create-btn' type='submit'>Add</button>
                <button className='cancel-btn' onClick={() => setShowUsersModal(false)}>Cancel</button> 
              </div>
            </form>

          </div>
      </div>
    </div>
    )}
    </>
  )
}

export default Modal;