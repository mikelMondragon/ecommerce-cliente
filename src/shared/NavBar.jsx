import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthContext';

function NavBar() {
    const { user, logout, role } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("login")
    }

    return (
        <nav>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                {!user ? (
                    <>
                        <li><Link to="/login">Iniciar Sesión</Link></li>
                        <li><Link to="/register">Registrarse</Link></li>
                    </>
                ) : (
                    <>
                        {role === 'admin' && <li><Link to="/admin-dashboard">Dashboard Admin</Link></li>}
                        {role === 'user' && <li><Link to="/user-dashboard">Dashboard Usuario</Link></li>}
                        <li><button onClick={handleLogout}>Cerrar sesión</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;