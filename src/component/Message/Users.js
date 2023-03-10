function Users(){
    
    const addedUsers = JSON.parse(localStorage.getItem('addedUsers'));
    console.log(addedUsers);
    
    return(
        <div>
            {addedUsers.map((user, id) => (
                <div key={user.id}>
                    {user.uid}
                </div>
            ))}
        </div>
    )
}

export default Users;