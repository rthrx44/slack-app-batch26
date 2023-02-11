import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <a 
                href="https://slack.com/legal"
                target="_blank"
                rel="noreferrer"
                className="footer-btn"
                >Privacy & Terms</a>
            <a 
                href="https://slack.com/help" 
                target="_blank"
                rel="noreferrer"
                className="footer-btn"
                >Contact Us</a>
        </footer>
    )
}

export default Footer