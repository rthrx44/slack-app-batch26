import React, { useEffect, useState } from "react"
import './Register.css'
import Footer from "../../component/Footer/Footer";
import Logo from "../../component/Logo/Logo";

function Register (props) {

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
        <Logo/>
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
            </form>
            <div className="option">
                    <span>Already using Slack?</span>
                    <button className="option-btn" onClick={() => props.onFormSwitch('registerSwitch')}>Back to Login</button>
                </div>
        </main>
        <Footer/>
        </>
    )
}

export default Register;