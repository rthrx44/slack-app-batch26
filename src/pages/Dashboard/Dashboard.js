import React, { useCallback, useEffect, useState } from 'react'
import './Dashboard.css'
import { IoMdLogOut } from "react-icons/io";
import { MiniLogo } from '../../component/Logo/Logo';
import Sidebar from '../../component/Sidebar/Sidebar';
import Modal from '../../component/Modal/Modal';

function Dashboard(props) {

  const {currentUser, setCurrentUser} = props;
  const email = currentUser.data.email
  const username = email.split('@')[0]

  const baseURL = process.env.REACT_APP_BASE_URL;

  const [showChannelModal, setShowChannelModal] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [showUserChannelModal, setShowUserChannelModal] = useState(false);
  const [channelArr, setChannelArr] = useState([]);
  const [channelCreated, setChannelCreated] = useState(false);
  const [users, setUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState(JSON.parse(localStorage.getItem('addedUsers')) || []);
  const [channelId, setChannelId] = useState(null);
  const [placeholder, setPlaceholder] = useState('');

  const handleLogOut = () => {
    setCurrentUser(null)
  };
  
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
        setChannelId(data.data.id);
        setPlaceholder(`Send a message to ${data.data.name}`)
        console.log(channelId);
    }catch(error) {
        console.error(error);
        alert(error.message);
    }
}

  // Retrieve Users
  const getUsers = useCallback(async(currentUser) => {
    try{
        const response = await fetch(`${baseURL}/users`, 
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
          return response.json();
    }catch(error){
        console.error(error.message);
        alert(alert.message);
    }
  }, [baseURL])

  useEffect(() => {
    async function fetchUsers() {
        const response = await getUsers(currentUser.currentUserAuthData)
        console.log(response);
        setUsers(response.data);
    }
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser){
      fetchUsers()
    }
  }, [getUsers]);

  return (
    <>
      <Modal 
        showChannelModal={showChannelModal} 
        showUsersModal={showUsersModal}
        showUserChannelModal={showUserChannelModal}
        setShowUsersModal={setShowUsersModal}
        setShowChannelModal={setShowChannelModal}
        setShowUserChannelModal={setShowUserChannelModal}
        setChannelCreated={setChannelCreated}
        users={users}
        addedUsers={addedUsers} 
        setAddedUsers={setAddedUsers}
        getChannelDetail={getChannelDetail}
        channelId={channelId}
      />
      <main className='nav-main-container'>
        <nav className='nav-container'>
          <MiniLogo/>
          <div className="nav-input-area">
            <input 
              type='text'
              placeholder='Search'
              className='nav-text-area'
              />
          </div>
          <div className='nav-account'>
            <span className='nav-account-name'>{username}</span>
            <button className='nav-account-btn' onClick={handleLogOut}>
              <IoMdLogOut/>
            </button>
          </div>
        </nav>
      </main>
      <Sidebar
        setShowChannelModal={setShowChannelModal}
        setShowUsersModal={setShowUsersModal}
        setShowUserChannelModal={setShowUserChannelModal}
        channelArr={channelArr} 
        setChannelArr={setChannelArr} 
        channelCreated={channelCreated}
        getUsers={getUsers}
        setAddedUsers={setAddedUsers}
        addedUsers={addedUsers}
        getChannelDetail={getChannelDetail}
        channelId={channelId}
        placeholder={placeholder}
        setPlaceholder={setPlaceholder}
      />
    </>
  )
}

export default Dashboard;