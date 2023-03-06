import { useState } from "react";

function ChannelMessage(){

    const baseURL = process.env.REACT_APP_BASE_URL;

    const [receiverId, setReceiverId] = useState('');
    const receiverClass = 'Channel';
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
                    receiver_id: receiverId,
                    receiver_class: receiverClass,
                    body: body
                }),
            });
        const data = await response.json();
        console.log(data);
        alert('Message sent!');
        setReceiverId('');
        setBody(''); 
    }

    return (
        <form action="" className="channelMessage-form" onSubmit={sendChannelMessage}>
            <div className="">
                <h1 className="">Channel Message Form</h1>
            </div>
            <div className="div">
                <input 
                    type='text'
                    placeholder="Enter receiver id"
                    value={receiverId}
                    className=''
                    onChange={(e) => setReceiverId(e.target.value)}
                />
                <input 
                    type='text'
                    placeholder="Enter receiver class"
                    value={receiverClass}
                    className=''
                    readOnly
                />
                <input 
                    type='text'
                    placeholder="Enter message body"
                    value={body}
                    className=''
                    onChange={(e) => setBody(e.target.value)}
                />
                <button className="">Send</button>
            </div>
        </form>
    )
}

export default ChannelMessage;