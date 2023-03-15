import { useState } from "react"
import { RiMailSendLine } from "react-icons/ri";

function UserMessage(props){

    const {userId, placeholder, userMessages, setUserMessages} = props;

    const baseURL = process.env.REACT_APP_BASE_URL;

    const [body, setBody] = useState('');

    const sendDirectMessage = async (e) => {
        e.preventDefault();

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const currentUserAuthData = currentUser.currentUserAuthData;

        const response = await fetch(`${baseURL}/messages`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'access-token' : currentUserAuthData.accessToken,
                    'client' : currentUserAuthData.client,
                    'expiry' : currentUserAuthData.expiry,
                    'uid' : currentUserAuthData.uid
                },
                body: JSON.stringify({
                    receiver_id: userId,
                    receiver_class: 'User',
                    body: body
                }),
            });
        const data = await response.json();
        console.log(data);
        setUserMessages([...userMessages, data.data]);
        alert('Message sent!');
        setBody('');
    }

    return(
        <div className='text-box'>
            <form className='message-field' onSubmit={sendDirectMessage}>
                <input 
                    className='input-field'
                    type="text"
                    placeholder={placeholder}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <RiMailSendLine className='send-btn'/>
            </form>
        </div>
    )
}

export default UserMessage;