import React from 'react'
import './Sidebar.css'

function Sidebar() {
    return (
        <main className='side-container'>
            <div className='sidebar-main-container'>
                <div className='sidebar-container'>
                    <div className='side-navbar'>
                        <div className='navbar-channel'>
                            Channels
                        </div>
                        <div className='navbar-dm'>
                            Direct Message
                        </div>
                    </div>
                </div>
            </div>
            <div className='body-main-container'>
                <div className='body-container'>
                    <div className='body-navbar'>
                        body
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Sidebar