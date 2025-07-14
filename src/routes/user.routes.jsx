import PrivateRoute from '../shared/PrivateRoute';
import { UserDashboard } from '../user/UserDashboard';
import { UserOrders } from '../user/UserOrders';
import { UserEdit } from '../user/UserEdit';

export const userRoutes = [
    {
        path: '/user-dashboard',
        element: (
            <PrivateRoute allowedRoles={['user']}>
                <UserDashboard />
            </PrivateRoute>
        ),
        children: [
            { path: 'orders', element: <UserOrders /> },
            { path: 'settings', element: <UserEdit /> }
        ]
    }
];
