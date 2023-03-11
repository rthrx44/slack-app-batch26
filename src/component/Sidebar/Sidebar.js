import React, { useState, useCallback, useEffect } from 'react'
import Channels from '../Channels/Channels'
import { Textbox } from '../Textbox/Textbox'
import './Sidebar.css'
import { FaPlus } from 'react-icons/fa';
import Users from '../Users/Users';

function Sidebar(props) {

    const {setShowChannelModal, setShowUsersModal, channelArr, setChannelArr, channelCreated, addedUsers} = props;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const baseURL = process.env.REACT_APP_BASE_URL;
  
    const [isLoading, setIsLoading] = useState(true);
    const [channelData, setChannelData] = useState([]);
    const [channelSelected, setChannelSelected] = useState(false);
    const [channelId, setChannelId] = useState(null);
    const [userMessageData, setUserMessageData] = useState([]);
    const [userSelected, setUserSelected] = useState(false);
    const [userId, setUserId] = useState(null);
    const [placeholder, setPlaceholder] = useState('');

    const handleChannelSelect = () => {
        setChannelSelected(true);
    }

    const handleUserSelect = () => {
        setUserSelected(true);
    }

    // Retrieve User Details
    const getUserDetails = (uid) => {
        const addedUsers = JSON.parse(localStorage.getItem('addedUsers'));
        const foundUser = addedUsers.find(user => user.uid === uid);
        setUserId(foundUser.id);
        setPlaceholder(`Send a message to ${foundUser.uid}`)
        console.log(userId);
    }

    // Retrieve Direct Messages
    const getDirectMessage = async(userId) => {
        try{
            const response = await fetch(`${baseURL}/messages?receiver_id=${userId}&receiver_class=User`, 
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
            setUserMessageData(data.data);
            console.log(userMessageData);
        }catch(error){
            console.error(error.message);
            alert(error.message);
        }
    }

    // Retrieve Channel Messages
    const getChannelMessage = async (channelId) => {
        try{
            if(currentUser){
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
                setChannelData(data.data);
                console.log(data.data);
            }
        }catch(error){
            console.error(error.message);
            alert(error.message);
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
            setChannelId(data.data.id);
            setPlaceholder(`Send a message to ${data.data.name}`)
            console.log(channelId);
        }catch(error) {
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
        <main className='side-container'>
            <div className='sidebar-main-container'>
                <div className='sidebar-container'>
                    <div className='side-navbar'>
                        <div>
                            <div className='navbar-bar'>
                                Channels
                                <button className='add-con' onClick={() => setShowChannelModal(true)}>
                                    <FaPlus className='add-btn'/>
                                </button>
                            </div>
                            <div className='navbar-channel-body'>
                                <Channels 
                                    channelArr={channelArr} 
                                    isLoading={isLoading}
                                    getChannelMessage={getChannelMessage}
                                    getChannelDetail={getChannelDetail}
                                    handleChannelSelect={handleChannelSelect}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='navbar-bar'>
                                Direct Message
                                <button className='add-con'>
                                    <FaPlus className='add-btn' onClick={() => setShowUsersModal(true)}/>
                                </button>
                            </div>
                            <div className='navbar-dm-body'>
                                <Users
                                    getUserDetails={getUserDetails}
                                    getDirectMessage={getDirectMessage}
                                    handleUserSelect={handleUserSelect}
                                    userSelected={userSelected}
                                    addedUsers={addedUsers}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='body-main-container'>
                <div className='body-navbar'>
                    <Textbox
                        placeholder={placeholder}
                        channelData={channelData}
                        setChannelData={setChannelData}
                        channelSelected={channelSelected}
                        channelId={channelId}
                        getChannelMessage={getChannelMessage}
                        userMessageData={userMessageData}
                        userId={userId}
                        userSelected={userSelected}
                    />
                </div>
            </div>
        </main>
        </>
    )
}

export default Sidebar