import './Users.css'
import { FaQuestionCircle, FaTrash } from 'react-icons/fa';

function Users(props){

    const {getUserDetails, getSingleUser, getDirectMessage, handleUserSelect, addedUsers, setAddedUsers, setUserInfoModal} = props;
    
    const deleteAddedUser = (id) => {
        const updatedUsers = addedUsers.filter(user => user.id !== id);
        localStorage.setItem('addedUsers', JSON.stringify(updatedUsers));
        setAddedUsers(updatedUsers);
    }

    const deleteAllAddedUsers = () => {
        const updatedUsers = [];
        localStorage.setItem('addedUsers', JSON.stringify(updatedUsers));
        setAddedUsers(updatedUsers)
    }
    
    return(
        <>

        {addedUsers.map((user) => (
            <div className='users-main-container' key={user.id}>
                <div className='users-container'>
                    <p onClick={() => {
                        getDirectMessage(user.id);
                        getUserDetails(user.uid);
                        handleUserSelect();
                    }}
                    >{user.uid}</p>
                <div className="users-actions">
                    <FaQuestionCircle 
                        className='action-btn' 
                        onClick={() => {
                            getUserDetails(user.uid);
                            setUserInfoModal(true);
                            getSingleUser(user.id);
                        }}       
                    />
                    <FaTrash 
                        className='action-btn' 
                        onClick={() => deleteAddedUser(user.id)}
                    />
                </div>
            </div>
            
        </div>
        ))}
        <div className='clear-users-container'>
            <button className='clear-users' onClick={deleteAllAddedUsers}>CLEAR</button>
        </div>
        </>
    )
}

export default Users;