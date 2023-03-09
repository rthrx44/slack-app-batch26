import React, { useState, useCallback, useEffect } from 'react'
import Channels from '../Channels/Channels'
import { Textbox } from '../Textbox/Textbox'
import './Sidebar.css'
import { FaPlus } from 'react-icons/fa';

function Sidebar(props) {

    const {onShow, channelArr, setChannelArr, channelCreated} = props;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const baseURL = process.env.REACT_APP_BASE_URL;
  
    const [isLoading, setIsLoading] = useState('');
    const [channelData, setChannelData] = useState([]);
    const [channelSelected, setChannelSelected] = useState(false);
    const [channelId, setChannelId] = useState(null);

    const handleChannelSelect = () => {
        setChannelSelected(true);
    }

    // Retrieve Channel Messages
    const getChannelMessage = async (channelId) => {
        try{
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
            console.log(channelData);
        }catch(error){
            console.error(error.message);
            alert(alert.message);
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
            console.log(data.data); 
            setChannelId(data.data.id);
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
                                <button className='add-con' onClick={onShow}>
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
                                    <FaPlus className='add-btn'/>
                                </button>
                            </div>
                            <div className='navbar-dm-body'>
                                dm body
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='body-main-container'>
                <div className='body-navbar'>
                    <Textbox
                        channelData={channelData}
                        channelSelected={channelSelected}
                        channelId={channelId}
                    />
                </div>
            </div>
        </main>
        </>
    )
}

export default Sidebar