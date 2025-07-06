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
            console.log("authchange", user)
            if (user) {
                const idToken = await user.getIdToken();
                const userInf = await apiFetch(`${urlBase}/auth/user`, "POST", {}, { idToken });
                console.log(userInf.role)
                setRole(userInf.role);
            }
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ user, role, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Se recomienda crear un hook
export function useAuth() {
    return useContext(AuthContext);
}