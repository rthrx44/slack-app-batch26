import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';

function App() {
  const [currentForm, setCurrentForm] = useState('loginSwitch'); 
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null);

  useEffect(() => {
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
  }, [currentUser]);

  const toggleForm = (formSwitch) => {
    setCurrentForm(formSwitch)
  }

  return(
    <>
      {
        currentUser ?
        <Dashboard 
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        /> : 
        <>{currentForm === 'loginSwitch' ? 
        <Register onFormSwitch={toggleForm}/> : 
        <Login onFormSwitch={toggleForm} setCurrentUser={setCurrentUser}/>}
        </>
      }
    </>
  )
}

export default App;
