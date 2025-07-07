// components/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function MainLayout() {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default MainLayout;
