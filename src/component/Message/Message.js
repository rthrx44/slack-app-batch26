import { useState } from "react"

function MessageTest(){

    const baseURL = process.env.REACT_APP_BASE_URL;

    const [receiverId, setReceiverId] = useState('');
    const receiverClass = 'User';
    const [body, setBody] = useState('');

    const sendDirectMessage = async (e) => {
        e.preventDefault();

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        const response = await fetch(`${baseURL}/messages`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'access-token' : currentUser.currentUserAuthData.accessToken,
                    'client' : currentUser.currentUserAuthData.client,
                    'expiry' : currentUser.currentUserAuthData.expiry,
                    'uid' : currentUser.currentUserAuthData.uid
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

    return(
        <form className="directMessage-form" onSubmit={sendDirectMessage}>
            <div className="">
                <h1 className="">Direct Message Form</h1>
            </div>
            <div className="">
                <input 
                    type='text'
                    placeholder='Enter receiver id'
                    value={receiverId}
                    className=''
                    onChange={(e) => setReceiverId(e.target.value)}
                />
                <input 
                    type='text'
                    placeholder='Enter receiver class'
                    value={receiverClass}
                    className=''
                    readOnly
                />
                <input 
                    type='text'
                    placeholder='Enter message body'
                    value={body}
                    className=''
                    onChange={(e) => setBody(e.target.value)}
                />
                <button className="">Send</button>
            </div>
        </form>
    )
}

export default MessageTest;