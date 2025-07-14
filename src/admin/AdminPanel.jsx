import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

function AdminPanel() {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Admin dashboard</h2>
            <button onClick={() => navigate("/admin-dashboard/products")}>Products</button>
            <button onClick={() => navigate("/admin-dashboard/users")}>Users</button>
            <Outlet />
        </div>
    );
}

export default AdminPanel;