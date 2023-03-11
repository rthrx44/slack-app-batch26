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
  const [channelArr, setChannelArr] = useState([]);
  const [channelCreated, setChannelCreated] = useState(false);
  const [users, setUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState(JSON.parse(localStorage.getItem('addedUsers')) || []);

  const handleLogOut = () => {
    setCurrentUser(null)
  };

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
        setShowUsersModal={setShowUsersModal}
        setShowChannelModal={setShowChannelModal}
        setChannelCreated={setChannelCreated}
        users={users}
        addedUsers={addedUsers} 
        setAddedUsers={setAddedUsers}
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
        channelArr={channelArr} 
        setChannelArr={setChannelArr} 
        channelCreated={channelCreated}
        setShowUsersModal={setShowUsersModal} 
        getUsers={getUsers}
        addedUsers={addedUsers}
      />
    </>
  )
}

export default Dashboard;