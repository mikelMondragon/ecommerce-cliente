import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/context/AuthContext';
import { CartVisualizer } from '../cart/CartVisualizer';
import { useCart } from "../cart/context/CartContext"

function NavBar() {
    const { user, logout, role } = useAuth();
    const { getTotalItemAmmount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("login");
    };


    const cartItemCount = getTotalItemAmmount();

    return (
        <nav className="relative flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-md dark:bg-neutral-700 lg:py-4 px-4">
            <div className="flex w-full flex-wrap items-center justify-between">
                {/* Logo o título */}
                <Link to="/" className="ms-2 text-xl font-semibold text-black dark:text-white">
                    Ecommerce
                </Link>

                {/* Buscador */}
                <div className="ms-5 flex w-[30%] items-center justify-between">
                    <input
                        type="search"
                        placeholder="Buscar..."
                        aria-label="Search"
                        aria-describedby="button-addon2"
                        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-secondary-500 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-800 transition duration-300 ease-in-out focus:border-primary focus:text-gray-700 focus:shadow-inner focus:outline-none dark:border-white/10 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-400"
                    />
                    <span
                        className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-gray-600 dark:text-white"
                        id="button-addon2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </div>

                {/* Badge cart */}
                <div className="relative flex items-center ms-4 group">
                    <span className="ms-3 rounded-md bg-red-600 px-2 py-1 text-xs font-bold leading-none text-white">
                        {cartItemCount}
                    </span>
                    <Link
                        to="/checkout"
                        className="ms-1 text-black/60 transition duration-200 hover:text-black/80 focus:text-black/80 active:text-black/80 dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80"
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
                    {/* Cart list */}
                    <div className="hidden group-hover:block absolute right-0 top-full mt-2 z-50">
                        <CartVisualizer />
                    </div>
                </div>


                {/* Menú de navegación */}
                <ul className="flex space-x-4 ms-4 items-center">
                    {!user ? (
                        <>
                            <li><Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-primary">Iniciar Sesión</Link></li>
                            <li><Link to="/register" className="text-gray-700 dark:text-gray-300 hover:text-primary">Registrarse</Link></li>
                        </>
                    ) : (
                        <>
                            {role === 'admin' && <li><Link to="/admin-dashboard" className="text-gray-700 dark:text-gray-300 hover:text-primary">Dashboard Admin</Link></li>}
                            {role === 'user' && <li><Link to="/user-dashboard" className="text-gray-700 dark:text-gray-300 hover:text-primary">Dashboard Usuario</Link></li>}
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-700 dark:text-gray-300 hover:text-red-600"
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
