import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../config/firebase.config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { apiFetch } from '../../utils/apiFetch';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const idToken = await user.getIdToken();
                const data = await apiFetch(`${urlBase}/auth/user`, "POST", {}, { idToken });
                const userInf = data.user;

                setRole(userInf.role);
            }
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            const data = await apiFetch(`${urlBase}/auth/logout`);
            signOut(auth);
        } catch (error) {
            console.log("logout error: ", error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, role, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext);
}