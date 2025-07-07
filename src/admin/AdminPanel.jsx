import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Panel de Administración</h2>
            <button onClick={() => navigate("/admin/products")}>Products</button>
            <button onClick={() => navigate("/admin/users")}>Users</button>
        </div>
    );
}

export default AdminPanel;