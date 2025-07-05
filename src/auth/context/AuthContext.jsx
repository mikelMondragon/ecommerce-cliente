import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase.config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null); // Guardar el rol del usuario

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setRole(userDoc.data().role); // Asignar rol desde Firestore
                }
            }
            setUser(user); // Guardar la información del usuario
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