import React from 'react'
import './Logo.css'
import slackLogo from '../../assests/img/slackLogo.png'
import slackLogoW from '../../assests/img/slackLogoW.png'

export const Logo = () => {
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

export const MiniLogo = () => {
    return (
        <div className="slack-mini-logo">
            <img 
                src={slackLogoW}
                alt="slack logo" 
                height='26px'
                className="logo"
            />
        </div>
    )
}