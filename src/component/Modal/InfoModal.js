import './InfoModal.css'

function InfoModal(props){

    const {userData, userInfoModal, setUserInfoModal, channelInfo, channelInfoModal, setChannelInfoModal, isLoading} = props;

    return(
        <>
        {userInfoModal ? (
            <div className='channel-modal'>
                <div className='modal-main-container'>
                    <div className='modal-container'>

                        <div className="userInfo-container">
                            <p className="">User Id: {userData.id}</p>
                            <p className="">User Email: {userData.uid}</p>
                            <p className="">Date Joined: {userData.created_at}</p>
                        

                        <button className='cancel-btn' onClick={() => setUserInfoModal(false)}>Close</button> 
                        </div>

                    </div>
                </div>
            </div>
        ): null}

        {channelInfoModal ? (
            <div className='channel-modal'>
                <div className='modal-main-container'>
                    <div className='modal-container'>

                        {isLoading || channelInfo === null ? (
                            <p className='infoModal-loading'>Loading...</p>
                        ): (
                            <div className="userInfo-container">
                                <p className="">Channel Id: {channelInfo.id}</p>
                                <p className="">Channel Name: {channelInfo.name}</p>
                                <p className="">Channel Created: {channelInfo.created_at}</p>
                        
                                <button className='cancel-btn' onClick={() => setChannelInfoModal(false)}>Close</button> 
                            </div>
                        )}

                    </div>
                </div>
            </div>
        ): null}
        
        </>
    )
}
export default InfoModal;