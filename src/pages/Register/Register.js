import React, {useState } from "react"
import './Register.css'
import Footer from "../../component/Footer/Footer";
import { Logo } from "../../component/Logo/Logo";

function Register ({onFormSwitch}) {

    const baseURL = process.env.REACT_APP_BASE_URL;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    // User Regsistration
    const register = async (e) => {
        e.preventDefault();

        if(password !== passwordConfirmation){
            alert('Passwords do not match');
            return;
        }
        try{
            const response = await fetch(`${baseURL}/auth`, 
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

            if(data.status === 'error'){
                alert(data.errors.full_messages[0]);
                return;
            }
            setEmail('');
            setPassword('');
            setPasswordConfirmation('');
            alert('User registration successful!');
        }catch(error){
            console.error(error);
            alert(error.message);
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
                    <button className="option-btn" onClick={() => onFormSwitch('registerSwitch')}>Back to Login</button>
                </div>
        </main>
        <Footer/>
        </>
    )
}

export default Register;