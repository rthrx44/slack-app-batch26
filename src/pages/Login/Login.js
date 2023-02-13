import React, { useState, useEffect }from "react";
import './Login.css'
import Footer from "../../component/Footer/Footer";
import { Logo } from "../../component/Logo/Logo";

function Login ({onFormSwitch, setIsLoggedIn}) {

    const url = 'http://206.189.91.54/api/v1/auth/';
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null);

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
    }, [currentUser]);


    // User Login
    const loginForm  = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${url}/sign_in`, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type' :  'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                });
            const data = await response.json();

            if(data.success === false){
                alert(data.errors[0]);
                return;
            }
            setCurrentUser(data);
            setEmail('');
            setPassword('');
            setIsLoggedIn(true);
            alert('Login successful!');
        }catch(error){
            console.error(error);
            alert(error.message);

        }
    };
    return (
        <main>
            <Logo/>
            <main className="register-main-container">
                <form onSubmit={loginForm}>
                    <div className="header-area">
                        <h1 className="header-text">Login to Slack</h1>
                        <span>We suggest using the email address you use at work.</span>
                    </div>
                    <div className="input-area">
                        <input 
                            type='email'
                            placeholder='Enter your email'
                            value={email}
                            className='text-area'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            className='text-area'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="continue-btn">Login</button>
                    </div>
                </form>
                <div className="option">
                        <span>New to Slack?</span>
                        <button className="option-btn" onClick={() => onFormSwitch('loginSwitch')}>Create an Account</button>
                    </div>
            </main>
            <Footer/>
        </main>
    )
}

export default Login;