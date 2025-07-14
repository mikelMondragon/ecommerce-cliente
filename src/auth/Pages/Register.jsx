import React, { useState } from 'react';
import { auth } from '../../config/firebase.config';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiFetch } from '../../utils/apiFetch';

function Register() {
    const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (!userName || typeof userName !== 'string' || userName.trim().length < 3) {
                throw new Error("Invalid user name: must be a string with at least 3 characters");
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();

            await apiFetch(`${urlBase}/auth/register`, 'POST', {}, { idToken, userName });

            toast.success('User registered');
            navigate('/');
        } catch (error) {
            toast.error('Error in register: ' + error.message);
        }
    };

    const handleGoogleRegister = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const idToken = await user.getIdToken();
            const userName = user.displayName || 'Unnamed';

            await apiFetch(`${urlBase}/auth/register`, 'POST', {}, { idToken, userName });

            toast.success('Registered with Google');
            navigate('/');
        } catch (error) {
            toast.error('Google Register Failed: ' + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Register</h2>

                <form className="space-y-4" onSubmit={handleRegister}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="Your username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
                    >
                        Register
                    </button>

                    <button
                        type="button"
                        onClick={handleGoogleRegister}
                        className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <img src="/assets/images/auth/web_neutral_rd_na.svg" alt="Google icon" className="w-5 h-5" />
                        Register with Google
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <span
                        onClick={() => navigate('/login')}
                        className="text-indigo-600 hover:text-indigo-500 font-medium cursor-pointer"
                    >
                        Login
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Register;
