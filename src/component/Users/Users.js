import './Users.css'
import { FaQuestionCircle, FaTrash } from 'react-icons/fa';

function Users(props){

    const {getUserDetails, getDirectMessage, handleUserSelect, addedUsers} = props;
    
    return(
        <>

        {addedUsers.map((user) => (
            <div className='users-main-container' key={user.id}>
                <div className='users-container'>
                    <p onClick={() => {
                        getDirectMessage(user.id)
                        getUserDetails(user.uid);
                        handleUserSelect();
                    }}
                    >{user.uid}</p>
                <div className="users-actions">
                    <FaQuestionCircle 
                        className='action-btn' 
                        onClick={() => getUserDetails(user.uid)}/>
                    <FaTrash className='action-btn' />
                </div>
            </div>
        </div>
        ))}
        
        </>
    )
}

export default Users;