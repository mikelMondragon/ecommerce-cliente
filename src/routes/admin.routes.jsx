import AdminPanel from '../admin/AdminPanel';
import ProductsAdminPanel from '../admin/ProductsAdminPanel';
import { CreateProduct } from '../products/CreateProduct';
import UsersAdminPanel from '../admin/UsersAdminPanel';
import PrivateRoute from '../shared/PrivateRoute';

export const adminRoutes = [
    {
        path: '/admin-dashboard',
        element: (
            <PrivateRoute allowedRoles={['admin']}>
                <AdminPanel />
            </PrivateRoute>
        ),
        children: [
            { path: 'products', element: <ProductsAdminPanel /> },
            { path: 'create-product', element: <CreateProduct /> },
            { path: 'users', element: <UsersAdminPanel /> }
        ]
    }
];
