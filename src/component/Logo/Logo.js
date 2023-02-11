import React from 'react'
import './Logo.css'
import  slackLogo from '../../assests/img/slackLogo.png'

function Logo() {
    return (
        <div className="slack-logo">
            <img 
                src={slackLogo}
                alt="slack logo" 
                height='26px'
                className="logo"
            />
        </div>
    )
}

export default Logo