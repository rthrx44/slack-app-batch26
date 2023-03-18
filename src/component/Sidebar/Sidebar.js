import React, { useState, useCallback, useEffect } from 'react'
import Channels from '../Channels/Channels'
import { Textbox } from '../Textbox/Textbox'
import './Sidebar.css'
import { FaPlus } from 'react-icons/fa';
import Users from '../Users/Users';

function Sidebar(props) {

    const {setShowChannelModal, setShowUsersModal, setShowUserChannelModal, setUserInfoModal, setChannelInfoModal, channelArr, setChannelArr, channelCreated, addedUsers, setAddedUsers, getChannelDetail, channelId, placeholder, setPlaceholder, getSingleUser} = props;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const baseURL = process.env.REACT_APP_BASE_URL;
  
    const [isLoading, setIsLoading] = useState(true);
    const [channelSelected, setChannelSelected] = useState(false);
    const [channelMessages, setChannelMessages] = useState([]);
    const [userMessages, setUserMessages] = useState([]);
    const [userSelected, setUserSelected] = useState(false);
    const [userId, setUserId] = useState(null);

    const handleChannelSelect = () => {
        setChannelSelected(true);
        setUserSelected(false);
    }

    const handleUserSelect = () => {
        setUserSelected(true);
        setChannelSelected(false);
    }

    // Retrieve User Details
    const getUserDetails = (uid) => {
        const addedUsers = JSON.parse(localStorage.getItem('addedUsers'));
        const foundUser = addedUsers.find(user => user.uid === uid);
        setUserId(foundUser.id);
        if(foundUser.id === currentUser.data.id){
            setPlaceholder('Jot something down.');
            return;
        }
        setPlaceholder(`Send a message to ${foundUser.uid}`)
        console.log(userId);
    }

    // Retrieve Direct Messages
    const getDirectMessage = async(userId) => {
        try{
            if(currentUser){
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
                setUserMessages(data.data);
            }
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
                setChannelMessages(data.data);
            }
        }catch(error){
            console.error(error.message);
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
                        <div className='channel-main-navbar'>
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
                                    setShowUserChannelModal={setShowUserChannelModal}
                                    setChannelInfoModal={setChannelInfoModal}
                                />
                            </div>
                        </div>
                        <div className='dm-main-navbar'>
                            <div className='navbar-bar'>
                                Direct Message
                                <button className='add-con'>
                                    <FaPlus className='add-btn' onClick={() => setShowUsersModal(true)}/>
                                </button>
                            </div>
                            <div className='navbar-dm-body'>
                                <Users
                                    getUserDetails={getUserDetails}
                                    getSingleUser={getSingleUser}
                                    getDirectMessage={getDirectMessage}
                                    handleUserSelect={handleUserSelect}
                                    userSelected={userSelected}
                                    addedUsers={addedUsers}
                                    setAddedUsers={setAddedUsers}
                                    setUserInfoModal={setUserInfoModal}
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
                        channelMessages={channelMessages}
                        setChannelMessages={setChannelMessages}
                        channelSelected={channelSelected}
                        channelId={channelId}
                        getChannelMessage={getChannelMessage}
                        getDirectMessage={getDirectMessage}
                        userMessages={userMessages}
                        setUserMessages={setUserMessages}
                        userId={userId}
                        userSelected={userSelected}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                    />
                </div>
            </div>
        </main>
        </>
    )
}

export default Sidebar