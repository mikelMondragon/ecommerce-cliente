import Register from '../auth/Pages/Register'
import { Login } from '../auth/Pages/Login'

export const authRoutes = [
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> }
]
