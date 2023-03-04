import Dashboard from '../pages/admin/dashboard';

export const adminRoutes = [
  {
    path: '/admin/login',
    element: <>Admin Login Page</>,
  },
  {
    path: '/admin',
    element: <Dashboard />,
  },
  {
    path: '/admin/tenants',
    element: <>Admin Tenants Page</>,
  },
  {
    path: '/admin/users',
    element: <>Admin Users Page</>,
  },
];
