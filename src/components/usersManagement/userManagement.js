import React, { useState, useEffect } from 'react';
import styles from './userManagement.module.css';
import sendRequest from '../other/sendRequest';
import { serverDomain } from '../other/variables';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await sendRequest(`${serverDomain}/users`);
        if (response.error) {
            console.log(response.error);
        } else {
            const users = response.users;
            setUsers(users);
        }
    };

    const handleSearch = async (e) => {
        setSearchTerm(e.target.value);

        const res = await sendRequest(`${serverDomain}/users/search?searchTerm=${e.target.value}`);
        if (res.error) {
            console.log(res.error);
        } else {
            const users = res.users;
            setUsers(users);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await sendRequest(`${serverDomain}/users/${id}`, 'DELETE');
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    const handleToggleStatus = async (id) => {
        try {
            const user = users.find(user => user._id === id);
            const updatedUser = { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' };
            await sendRequest(`/api/users/${id}`, 'PUT', updatedUser);
            setUsers(users.map(u => u._id === id ? updatedUser : u));
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const filteredUsers = users.filter(user =>
        (filterRole === 'all' || user.role.toLowerCase() === filterRole.toLowerCase()) &&
        (filterStatus === 'all' || user.status === filterStatus) &&
        (user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>User Management</h2>
            <div className={styles.controls}>
                <input
                    type="text"
                    placeholder="Search by Name or Email"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e)}
                    className={styles.searchInput}
                />
                <select onChange={(e) => setFilterRole(e.target.value)} className={styles.select}>
                    <option value="all">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                <select onChange={(e) => setFilterStatus(e.target.value)} className={styles.select}>
                    <option value="all">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map(user => (
                        <tr key={user._id}>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.role === 'drendo' ? 'user' : user.role}</td>
                            <td className={user.status === 'Active' ? styles.active : styles.inactive}>{user.status}</td>
                            <td>
                                <button onClick={() => handleToggleStatus(user._id)} className={`${styles.buttons} ${styles.toggleButton}`}>Toggle</button>
                                <button onClick={() => handleDelete(user._id)} className={`${styles.buttons} ${styles.deleteButton}`}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.pagination}>
                <button className={`${styles.buttons}`} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
                <button className={`${styles.buttons}`} disabled={indexOfLastUser >= filteredUsers.length} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </div>
        </div>
    );
};

export default UserManagement;