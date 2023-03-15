import React, { useEffect, useState } from 'react'
import './Modal.css'

const Modal = (props) => {

  const {users, showChannelModal, setShowChannelModal, showUsersModal, setShowUsersModal,showUserChannelModal, setShowUserChannelModal, setChannelCreated, addedUsers, setAddedUsers, channelId} = props;

  const baseURL = process.env.REACT_APP_BASE_URL;

  const [channelName, setChannelName] = useState('');
  const [userEmails, setUserEmails] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    localStorage.setItem('addedUsers', JSON.stringify(addedUsers));
  }, [addedUsers]);

  // Create Channel
  const createChannel = async (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentUserAuthData = currentUser.currentUserAuthData;

    const addedIds = [];
    userEmails.forEach(email => {
      const matchedUser = users.find(user => {return user.uid === email});
      if(matchedUser){
        addedIds.push(matchedUser.id);
      }
    })

    try {
      const response = await fetch(`${baseURL}/channels`,
        {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
            'access-token' : currentUserAuthData.accessToken,
            'client' : currentUserAuthData.client,
            'expiry' : currentUserAuthData.expiry,
            'uid' : currentUserAuthData.uid
          },
          body: JSON.stringify({
            name: channelName,
            user_ids: addedIds
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
      console.log('addedIds', addedIds);
      console.log('userEmails', userEmails)
      alert(`${channelName} created!`);
      setChannelName('');
      setUserEmails([]);
      setShowChannelModal(false);
      setChannelCreated(true);
    }catch(error){
      console.error(error);
      alert(error.message);
    }
  }

  // Save User To Local Storage
  const saveUser = (e) => {
    e.preventDefault();
    const existingUser = users.find(user => user.uid === userEmail)
    
    if(existingUser){
      const userAlreadyAdded = addedUsers.some(user => user.uid === userEmail)
      if(userAlreadyAdded){
        alert(`${userEmail} is already added.`);
        setUserEmail('');
        return;
      }
      setAddedUsers([...addedUsers, existingUser]);
      console.log('Exists!')
      setUserEmail('');
      setShowUsersModal(false);
      return
    }
    alert(`${userEmail} does not exist!`)
    setUserEmail('');
    setShowUsersModal(false);
  }

  // Add User To Channel
  const addUserToChannel = async (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentUserAuthData = currentUser.currentUserAuthData;
    const matchedUser = users.find(user => user.uid === userEmail);

    if(!matchedUser){
      alert('User does not exist');
      return;
    }

    if(matchedUser){
      try{
        const response = await fetch(`${baseURL}/channel/add_member`,
        {
          'method' : 'POST',
          'headers' : {
            'Content-Type' : 'application/json',
            'access-token' : currentUserAuthData.accessToken,
            'client' : currentUserAuthData.client,
            'expiry' : currentUserAuthData.expiry,
            'uid' : currentUserAuthData.uid
          },
          body: JSON.stringify({
            id: channelId,
            member_id: matchedUser.id
          })
        });
        const data = await response.json();
        console.log(data);
        setUserEmail('');
        alert('User is added');
        setShowUserChannelModal(false);
      }catch(error){
        console.error(error);
        alert(error.message);
      }
    } 
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
                  placeholder='Enter user emails separated by comma'
                  value={userEmails}
                  onChange={(e) => setUserEmails(e.target.value.split(',').map(email => email.trim()))}
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

            <form className='create-channel-container' onSubmit={saveUser}>
              <div className='create-channel'>
                Add a user
              </div>

                <input 
                  className='text-create-channel' 
                  type='text'
                  placeholder='Enter user email'
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  autoFocus
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

    {showUserChannelModal && (
    <div className='usersChannel-modal'>
      <div className='modal-main-container'>
          <div className='modal-container'>

            <form className='create-channel-container' onSubmit={addUserToChannel}>
              <div className='create-channel'>
                Add a user to this channel
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
                <button className='cancel-btn' onClick={() => setShowUserChannelModal(false)}>Cancel</button> 
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