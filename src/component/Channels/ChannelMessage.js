import { useState } from "react";
import { RiMailSendLine } from "react-icons/ri";

function ChannelMessage(props){

    const {channelId, placeholder, channelMessages, setChannelMessages} = props;

    const baseURL = process.env.REACT_APP_BASE_URL;

    const [body, setBody] = useState('');

    const sendChannelMessage = async (e) => {
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
                    receiver_id: channelId,
                    receiver_class: 'Channel',
                    body: body
                }),
            });
        const data = await response.json();
        data.data.sender = currentUser.data;
        console.log(data);
        setChannelMessages([...channelMessages, data.data]);
        setBody(''); 
    }

    return (
        <div className='text-box'>
            <form className='message-field' onSubmit={sendChannelMessage}>
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

export default ChannelMessage;