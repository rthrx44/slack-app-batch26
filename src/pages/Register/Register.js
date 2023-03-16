import React, { useState, useEffect } from "react"
import './Register.css'
import Footer from "../../component/Footer/Footer";
import { Logo } from "../../component/Logo/Logo";
import { ErrorModal, SuccessModal } from "../../component/Modal/PopupModals";
import Spinner from "../Spinner/Spinner";

function Register ({onFormSwitch}) {

    const baseURL = process.env.REACT_APP_BASE_URL;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [modalError, setModalError] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false); 

    const handleClosePopUp = (e) => {setModalError(false);}

    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
    setTimeout(() => {setShowLoading(false)},3000);
    })

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
                setModalError(true);
                return;
            }
            setEmail('');
            setPassword('');
            setPasswordConfirmation('');
            setModalSuccess(true)
            setTimeout(onFormSwitch, 2000);
        }catch(error){
            console.error(error);
            alert(error.message);
        }
    };

    return(
        <>
        {modalError && <ErrorModal closeModal={handleClosePopUp} message='Please fill up required fields properly.'/>}
        {modalSuccess && <SuccessModal message="Sign up complete! Please wait."/>}
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