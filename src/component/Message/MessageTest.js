import { useState, useEffect } from "react"

function MessageTest(){

    const url = 'http://206.189.91.54/api/v1'

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const [receiverId, setReceiverId] = useState('');
    const receiverClass = 'User';
    const [body, setBody] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [client, setClient] = useState('');
    const [expiry, setExpiry] = useState('');
    const [uid, setUid] = useState('');

    useEffect(() => {
        if(currentUser){
            setAccessToken(currentUser.currentUserAuthData.accessToken);
            setClient(currentUser.currentUserAuthData.client);
            setExpiry(currentUser.currentUserAuthData.expiry);
            setUid(currentUser.currentUserAuthData.uid); 
        }
    }, [currentUser]);

    const sendDirectMessage = async (e) => {
        e.preventDefault();

        const response = await fetch(`${url}/messages`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'access-token' : accessToken,
                    'client' : client,
                    'expiry' : expiry,
                    'uid' : uid
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
        <>
            <form className="directMessage-form" onSubmit={sendDirectMessage}>
                <div className="">
                    <h1 className="">Message Form</h1>
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
        </>
    )
}

export default MessageTest;