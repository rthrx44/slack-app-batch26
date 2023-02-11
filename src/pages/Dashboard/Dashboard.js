import React from 'react'
import './Dashboard.css'
import { IoMdLogOut } from "react-icons/io";

function Dashboard() {
  return (
    <main className='nav-main-container'>
      <nav className='nav-container'>
        <div className="input-area">
          <input 
            type='text'
            placeholder='Search'
            className='text-area'
            />
        </div>
        <div className='nav-account'>
          <span className='nav-account-name'>Ruther</span>
          <button className='nav-account-btn'>
            <img 
              src={<IoMdLogOut/>}
              alt='logout button'
              className='logout-img'
              />
          </button>
        </div>
      </nav>
    </main>
  )
}

export default Dashboard