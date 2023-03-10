import React, { useState } from 'react'
import './Dashboard.css'
import { IoMdLogOut } from "react-icons/io";
import { MiniLogo } from '../../component/Logo/Logo';
import Sidebar from '../../component/Sidebar/Sidebar';
import Modal from '../../component/Modal/Modal';

function Dashboard({setCurrentUser}) {

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const baseURL = process.env.REACT_APP_BASE_URL;

  const [showChannelModal, setShowChannelModal] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [channelArr, setChannelArr] = useState([]);
  const [channelCreated, setChannelCreated] = useState(false);
  const [users, setUsers] = useState([]);

  const handleLogOut = () => {
    setCurrentUser(null)
  };

  // Retrieve Users
  const getUsers = async() => {
    try{
        const response = await fetch(`${baseURL}/users`, 
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
        setUsers(data.data);
        console.log(users);
    }catch(error){
        console.error(error.message);
        alert(alert.message);
    }
  }

  return (
    <>
      <Modal 
        showChannelModal={showChannelModal} 
        showUsersModal={showUsersModal}
        setShowUsersModal={setShowUsersModal}
        setShowChannelModal={setShowChannelModal}
        setChannelCreated={setChannelCreated}
        users={users}
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
            <span className='nav-account-name'>Ruther</span>
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
      />
    </>
  )
}

export default Dashboard;