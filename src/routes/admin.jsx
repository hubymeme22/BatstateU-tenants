import Main from '../layouts/Main';

import Dashboard from '../pages/admin/dashboard';
import Tenants from '../pages/admin/tenants';
import Users from '../pages/admin/users';

export const adminRoutes = [
  {
    path: '/admin',
    element: <Main />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'login',
        element: <>Admin Login Page</>,
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
];
