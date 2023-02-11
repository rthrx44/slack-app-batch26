import React, { useState } from 'react';
import './App.css';
// import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';

function App() {
  const [currentForm, setCurrentForm] = useState('loginSwitch'); 

  const toggleForm = (formSwitch) => {
    setCurrentForm(formSwitch)
  }

  return(
    <>
      {/* <Dashboard /> */}
      {currentForm === 'loginSwitch' ? <Register onFormSwitch={toggleForm}/> : <Login onFormSwitch={toggleForm}/>}
    </>
  )
}

export default App;
