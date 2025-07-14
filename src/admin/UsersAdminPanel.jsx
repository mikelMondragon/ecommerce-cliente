import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase.config';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

function UsersAdminPanel() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [newRole, setNewRole] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const userList = [];
            querySnapshot.forEach((doc) => {
                userList.push({ id: doc.id, ...doc.data() });
            });
            setUsers(userList);
        };
        fetchUsers();
    }, []);

    const handleRoleChange = async () => {
        if (selectedUser && newRole) {
            const userRef = doc(db, 'users', selectedUser);
            await updateDoc(userRef, { role: newRole });
            alert('Rol actualizado con éxito');
        } else {
            alert('Debe seleccionar un usuario y un nuevo rol');
        }
    };

    return (
        <div>
            <h2>Panel de Administración</h2>
            <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
                <option value="">Seleccionar Usuario</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.id} - {user.email}
                    </option>
                ))}
            </select>
            <select onChange={(e) => setNewRole(e.target.value)} value={newRole}>
                <option value="">Seleccionar Rol</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>
            <button onClick={handleRoleChange}>Cambiar Rol</button>
        </div>
    );
}

export default UsersAdminPanel;