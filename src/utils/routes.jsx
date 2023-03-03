export const userRoutes = [
  {
    path: '/',
    element: <>User Page</>,
  },
  {
    path: '/login',
    element: <>User Login Page</>,
  },
  {
    path: '/bills',
    element: <>User Bills</>,
  },
];

export const adminRoutes = [
  {
    path: '/admin',
    element: <>Admin Dashboard</>,
  },
  {
    path: '/admin/login',
    element: <>Admin Login Page</>,
  },
  {
    path: '/admin/users',
    element: <>Admin Users Page</>,
  },
];

export const errorRoute = {
  path: '*',
  element: <>This page does not exist</>,
};
