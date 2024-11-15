import React, { useEffect, useState } from 'react';
import { getUsers, archiveUser, activateUser } from '../../Services/adminService';
import "./admin.css"
const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('A##KEY'); // Get token for authorization

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await getUsers(token);
        setUsers(response.data);
    };

    const handleArchiveUser = async (userId) => {
        await archiveUser(userId, token);
        fetchUsers(); // Refresh user list
    };

    const handleActivateUser = async (userId) => {
        await activateUser(userId, token);
        fetchUsers(); // Refresh user list
    };

    return (
        //table data which shows user details
        <div>
            <h2 className='p-3'>User Management</h2>
            <table className="ad-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user) => (
                        <tr key={user.user_id}>
                            <td>{user.name}</td>
                            <td>{user.is_archived ? 'Archived' : 'Active'}</td>
                            <td>
                                {user.is_archived ? (
                                    <button onClick={() => handleActivateUser(user.user_id)}>Activate</button>
                                ) : (
                                    <button onClick={() => handleArchiveUser(user.user_id)}>Archive</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
