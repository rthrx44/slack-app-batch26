import React, { useState } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';

function App() {
  const [currentForm, setCurrentForm] = useState('loginSwitch'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleForm = (formSwitch) => {
    setCurrentForm(formSwitch)
  }

  return(
    <>
      {
        isLoggedIn ?
        <Dashboard setIsLoggedIn={setIsLoggedIn}/> : 
        <>{currentForm === 'loginSwitch' ? <Register onFormSwitch={toggleForm}/> : <Login onFormSwitch={toggleForm} setIsLoggedIn={setIsLoggedIn}/>}</>
      }
    </>
  )
}

export default App;
