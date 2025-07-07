import React, { useState } from 'react';
import { auth, db } from '../../config/firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiFetch } from '../../utils/apiFetch';

function Register() {
    const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            if (!userName || typeof userName !== 'string' || userName.trim().length < 3) {
                throw new Error("Invalid user name: must be a string with at least 3 characters");
            }
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();

            const data = await apiFetch(`${urlBase}/auth/register`,
                "POST", {}, { idToken, userName })

            toast.done("user registered")
            navigate("/");
        } catch (error) {

            toast.error("Error in register " + error?.errors);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Nombre"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Registry</button>
            <p>
                Are you already registered?{' '}
                <span
                    style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => navigate('/login')}
                >
                    Login here
                </span>
            </p>
        </div>
    );
}

export default Register;