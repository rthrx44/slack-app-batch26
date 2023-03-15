import React, { useCallback, useEffect, useState } from 'react'
import './Dashboard.css'
import { IoMdLogOut } from "react-icons/io";
import { MiniLogo } from '../../component/Logo/Logo';
import Sidebar from '../../component/Sidebar/Sidebar';
import Modal from '../../component/Modal/Modal';
import InfoModal from '../../component/Modal/InfoModal';
import '../Spinner/Spinner.css'
import Spinner from '../Spinner/Spinner';

function Dashboard(props) {

  const {currentUser, setCurrentUser} = props;
  const email = currentUser.data.email
  const username = email.split('@')[0]

  const baseURL = process.env.REACT_APP_BASE_URL;

  const [showChannelModal, setShowChannelModal] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [userInfoModal, setUserInfoModal] = useState(false);
  const [channelInfoModal, setChannelInfoModal] = useState(false);
  const [showUserChannelModal, setShowUserChannelModal] = useState(false);
  const [channelArr, setChannelArr] = useState([]);
  
  const [channelCreated, setChannelCreated] = useState(false);
  const [users, setUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState(JSON.parse(localStorage.getItem('addedUsers')) || []);
  const [userData, setUserData] = useState(null);
  const [channelId, setChannelId] = useState(null);
  const [channelInfo, setChannelInfo] = useState(null);
  const [placeholder, setPlaceholder] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
        setChannelInfo(data.data);
        setPlaceholder(`Send a message to ${data.data.name}`)
        setIsLoading(false);
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

  // Get Single User Detail From LocalStorage
  const getSingleUser = (id) => {
    const user = addedUsers.find(user => user.id === id);
    setUserData(user);
    console.log(user);
  }

  useEffect(() => {
    async function fetchUsers() {
        const response = await getUsers(currentUser.currentUserAuthData)
        console.log(response);
        setUsers(response.data);
        setIsLoading(false);
    }
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser){
      fetchUsers();
    }
  }, [getUsers]);

  return (
    <>

    {/* <div className="spinner-container">
      <div className="spinner-content">
        <h1 className='loading-text'>Fetching data, one bit at a time...</h1>
        <div className='loading'></div>
      </div>
    </div> */}

    {isLoading ? (
    <Spinner />
    ): 
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
    
    <InfoModal 
      userData={userData}
      userInfoModal={userInfoModal}
      setUserInfoModal={setUserInfoModal}
      channelInfo={channelInfo}
      setChannelInfo={setChannelInfo}
      channelInfoModal={channelInfoModal}
      setChannelInfoModal={setChannelInfoModal}
      getChannelDetail={getChannelDetail}
      isLoading={isLoading}
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
          <span className='nav-account-name'>
          {isLoading ? 'Loading...' : username}
          </span>
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
      setUserInfoModal={setUserInfoModal}
      setChannelInfoModal={setChannelInfoModal}
      channelArr={channelArr} 
      setChannelArr={setChannelArr} 
      channelCreated={channelCreated}
      getUsers={getUsers}
      getSingleUser={getSingleUser}
      setAddedUsers={setAddedUsers}
      addedUsers={addedUsers}
      getChannelDetail={getChannelDetail}
      channelId={channelId}
      placeholder={placeholder}
      setPlaceholder={setPlaceholder}
    />
    </>
    } 
    </>
  )
}

export default Dashboard;