import React, { useState }from "react";
import './Login.css'
import Footer from "../../component/Footer/Footer";
import { Logo } from "../../component/Logo/Logo";
import { ErrorModal } from "../../component/Modal/PopupModals";

function Login ({onFormSwitch, setCurrentUser}) {

    const baseURL = process.env.REACT_APP_BASE_URL
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalError, setModalError] = useState(false);

    const handleClosePopUp = (e) => {setModalError(false);}

    // User Login
    const loginForm  = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseURL}/auth/sign_in`, 
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
                setModalError(true);
                return;
            }

            const currentUserAuthData = {
                accessToken: response.headers.get('access-token'),
                client: response.headers.get('client'),
                expiry: response.headers.get('expiry'),
                uid: response.headers.get('uid'),
            };

            setCurrentUser({...data, currentUserAuthData});
            setEmail('');
            setPassword('');
        }catch(error){
            console.error(error);
            alert(error.message);
        }
    };
    return (
        <main>
            {modalError && <ErrorModal closeModal={handleClosePopUp} message='Invalid login credentials. Please try again.'/>}
            <Logo/>
            <div className="register-main-container">
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
            </div>
            <Footer/>
        </main>
    )
}

export default Login;