import React from 'react'
import './Dashboard.css'
import { IoMdLogOut } from "react-icons/io";
import { MiniLogo } from '../../component/Logo/Logo';
import Sidebar from '../../component/Sidebar/Sidebar';

function Dashboard({setIsLoggedIn}) {

  const handleLogOut = () => {
    setIsLoggedIn(false)
  }

  return (
    <>
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
            <span className='nav-account-name'>Ruther</span>
            <button className='nav-account-btn' onClick={handleLogOut}>
              <IoMdLogOut/>
            </button>
          </div>
        </nav>
      </main>
      <Sidebar/>
    </>
  )
}

export default Dashboard;