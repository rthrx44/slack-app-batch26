import React from 'react'
import Channels from '../Channels/Channels'
import { Textbox } from '../Textbox/Textbox'
import './Sidebar.css'
import { FaPlus } from 'react-icons/fa';

function Sidebar(props) {

    const {onShow, channelArr, setChannelArr, channelCreated} = props;

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
                                <Channels channelArr={channelArr} setChannelArr={setChannelArr} channelCreated={channelCreated}/>
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
                    <Textbox/>
                </div>
            </div>
        </main>
        </>
    )
}

export default Sidebar