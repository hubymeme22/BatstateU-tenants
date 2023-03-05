import Dashboard from '../pages/admin/dashboard';
import Tenants from '../pages/admin/tenants';
import Users from '../pages/admin/users';

export const adminRoutes = [
  {
    path: '/admin/login',
    element: <>Admin Login Page</>,
  },
  {
    path: '/admin/',
    element: <Dashboard />,
  },
  {
    path: '/admin/tenants',
    element: <Tenants />,
  },
  {
    path: '/admin/users',
    element: <Users />,
  },
];
