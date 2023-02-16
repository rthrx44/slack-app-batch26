import React from 'react'
// import { useEffect } from 'react'

const LoginButton = (userchibby) => {
    const loginURL = "http://206.189.91.54/api/v1/auth/sign_in"
    
    // useEffect(() => {
    //     localStorage.setItem('currentUser', JSON.stringify(userchibby))
    // }, [userchibby]);

    const loginMuna = async (e) => {
    // e.preventDefault()
    

    let loginResponse = await fetch(loginURL, 
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userchibby)
    })

    const result = await loginResponse.json()
    setTimeout(() => alert(result.message), 500)
    }
    
    
    return (
        <button onClick={loginMuna}>
            Sign-in lmao
        </button>
    )
}

export default LoginButton