import React, { useEffect, useState } from "react"
import './Register.css'
import  slackLogo from '../../src/assests/img/slackLogo.png'

const Register = () => {

    const url = 'http://206.189.91.54/api/v1/auth/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    // User Regsistration
    const register = async (e) => {
        e.preventDefault();

        if(password !== passwordConfirmation){
            alert('Passwords do not match');
            return;
        }else if(users.some(user => user.email === email)){
            alert('Email is already used. Please choose a different one.')
            return;
        }else if(email && password && passwordConfirmation){
            const response = await fetch(url, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        password_confirmation: passwordConfirmation
                    }),
                });
            const data = await response.json();
            setUsers([...users, data]);
            setEmail('');
            setPassword('');
            setPasswordConfirmation('');
            setTimeout(() => alert('User registration successful!'), 175)
        }
    };

    return(
        <>
        <div className="slack-logo">
            <img 
                src={slackLogo}
                alt="slack logo" 
                height='26px'
                className="logo"
            />
        </div>
        <main className="register-main-container">
            <form onSubmit={register}>
                <div className="header-area">
                    <h1 className="header-text">Sign up to Slack</h1>
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
                    <input 
                        type='password'
                        placeholder='Confirm password'
                        value={passwordConfirmation}
                        className='text-area'
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                    <button className="continue-btn">Continue</button>
                </div>
                <div className="option">
                    <span>Already using Slack?</span>
                </div>
            </form>
        </main>
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
        </>
    )
}

const Login = () => {

    const url = 'http://206.189.91.54/api/v1/auth/';
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null);

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
    }, [currentUser]);


    // User Login
    const login  = async (e) => {
        e.preventDefault();

        if(email && password){
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
            setCurrentUser(data);
            setEmail('');
            setPassword('');
            setTimeout(() => alert('Login successful!'), 175)
        }
    };
    return (
        <>
        <div className="slack-logo">
            <img 
                src={slackLogo}
                alt="slack logo" 
                height='26px'
                className="logo"
            />
        </div>
        <main className="register-main-container">
            <form onSubmit={login}>
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
                <div className="option">
                    <span>New to Slack?</span>
                </div>
            </form>
        </main>
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
        </>
    )
}

const ChangeForm = ({getProfile}) => {
    const [signUp, setSignUp] = useState(false);
    const handleClick = () => {
        setSignUp(!signUp);
    };
    
    return (
        <div className="register-main-container change-form" >
            {!signUp ? <Register getProfile={getProfile}/> : <Login />}
            <button className="option-btn" onClick={handleClick}>
                {!signUp ? "Back to Login" : "Create an Account"}
            </button>
        </div>
        );
    };

export default ChangeForm;