import { useEffect, useState } from "react"

function Register(){

    const url = 'http://206.189.91.54/api/v1/auth/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
    }, [users, currentUser]);

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

    return(
        <>
        <form onSubmit={register}>
        <h2>Register</h2>
            <input 
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input 
                type='password'
                placeholder='Confirm password'
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <button>Submit</button>
        </form>

        <form onSubmit={login}>
        <h2>Login</h2>
            <input 
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button>Submit</button>
        </form>
        </>
    )
}

export default Register;