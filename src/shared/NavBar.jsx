import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthContext';
import { CartVisualizer } from '../cart/CartVisualizer';
import { useCart } from "../cart/context/CartContext";

function NavBar() {
    const { user, logout, role } = useAuth();
    const { getTotalItemAmmount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("login");
    };

    const [query, setQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSearch = () => {
        const trimmed = query.trim();
        if (trimmed) {
            navigate(`/products/?name=${encodeURIComponent(trimmed)}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const cartItemCount = getTotalItemAmmount();

    return (
        <nav className="bg-blue-100 dark:bg-blue-900 shadow-md px-4 py-3">
            <div className="flex justify-between items-center w-full">
                {/* Logo */}
                <Link to="/" className="text-xl font-semibold text-blue-800 dark:text-blue-100">
                    Ecommerce
                </Link>

                {/* Mobile toggle */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-blue-800 dark:text-blue-100 lg:hidden"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Desktop nav */}
                <div className="hidden lg:flex items-center space-x-6 w-full justify-end">
                    {/* Search */}
                    <div className="flex w-[30%] items-center">
                        <input
                            type="search"
                            placeholder="Buscar..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full rounded border border-blue-400 bg-white px-3 py-1.5 text-base text-blue-900 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-blue-800 dark:text-white dark:placeholder:text-blue-200"
                        />
                        <button
                            onClick={handleSearch}
                            className="ml-2 text-blue-700 dark:text-blue-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Cart */}
                    <div className="relative flex items-center group">
                        <span className="ml-2 rounded-md bg-red-600 px-2 py-1 text-xs font-bold text-white">
                            {cartItemCount}
                        </span>
                        <Link
                            to="/checkout"
                            className="ml-1 text-blue-800 hover:text-blue-900 dark:text-blue-200 dark:hover:text-white"
                            aria-label="Carrito"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                            </svg>
                        </Link>
                        <div className="hidden group-hover:block absolute right-0 top-full mt-2 z-50">
                            <CartVisualizer />
                        </div>
                    </div>

                    {/* Links */}
                    <ul className="flex space-x-4 items-center">
                        {!user ? (
                            <>
                                <li><Link to="/login" className="text-blue-700 dark:text-blue-200 hover:text-blue-900">Iniciar Sesión</Link></li>
                                <li><Link to="/register" className="text-blue-700 dark:text-blue-200 hover:text-blue-900">Registrarse</Link></li>
                            </>
                        ) : (
                            <>
                                {role === 'admin' && <li><Link to="/admin-dashboard" className="text-blue-700 dark:text-blue-200 hover:text-blue-900">Dashboard Admin</Link></li>}
                                {role === 'user' && <li><Link to="/user-dashboard" className="text-blue-700 dark:text-blue-200 hover:text-blue-900">Dashboard Usuario</Link></li>}
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-blue-700 dark:text-blue-200 hover:text-red-500"
                                    >
                                        Cerrar sesión
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="mt-4 flex flex-col space-y-4 lg:hidden">
                    <div className="flex items-center">
                        <input
                            type="search"
                            placeholder="Buscar..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full rounded border border-blue-400 bg-white px-3 py-1.5 text-base text-blue-900 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-blue-800 dark:text-white dark:placeholder:text-blue-200"
                        />
                        <button
                            onClick={handleSearch}
                            className="ml-2 text-blue-700 dark:text-blue-200"
                        >
                            🔍
                        </button>
                    </div>

                    <ul className="flex flex-col space-y-2">
                        {!user ? (
                            <>
                                <li><Link to="/login" className="text-blue-700 dark:text-blue-200">Iniciar Sesión</Link></li>
                                <li><Link to="/register" className="text-blue-700 dark:text-blue-200">Registrarse</Link></li>
                            </>
                        ) : (
                            <>
                                {role === 'admin' && <li><Link to="/admin-dashboard" className="text-blue-700 dark:text-blue-200">Dashboard Admin</Link></li>}
                                {role === 'user' && <li><Link to="/user-dashboard" className="text-blue-700 dark:text-blue-200">Dashboard Usuario</Link></li>}
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-blue-700 dark:text-blue-200"
                                    >
                                        Cerrar sesión
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default NavBar;
