import React, { useState } from 'react'
import './Dashboard.css'
import { IoMdLogOut } from "react-icons/io";
import { MiniLogo } from '../../component/Logo/Logo';
import Sidebar from '../../component/Sidebar/Sidebar';
import Modal from '../../component/Modal/Modal';

function Dashboard({setCurrentUser}) {
  const [show, setShow] = useState(false);

  const onClose = () => {setShow(false)};
  
  const onShow = () => {setShow(true)};

  const handleLogOut = () => {
    setCurrentUser(null)
  };

  return (
    <>
      <Modal 
        show={show} 
        onClose={onClose}
      />
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
      <Sidebar onShow={onShow}/>
    </>
  )
}

export default Dashboard;