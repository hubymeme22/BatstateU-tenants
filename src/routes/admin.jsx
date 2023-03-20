import Main from '../layouts/main';

import AdminLogin from '@/pages/admin/login';
import Dashboard from '@/pages/admin/dashboard';
import Tenants from '@/pages/admin/tenants';
import Users from '@/pages/admin/users';

export const adminRoutes = [
  {
    path: '/admin',
    element: <Main type="admin" />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'tenants',
        element: <Tenants />,
      },
      {
        path: 'users',
        element: <Users />,
      },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
];
