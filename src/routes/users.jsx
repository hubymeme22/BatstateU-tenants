import Index from '../pages/user/login/Index';
import UserPage from '../pages/user/userPage/UserPage';
import UserBills from '../pages/user/userBills/UserBills';
export const userRoutes = [
  {
    path: '/login',
    element: <Index />,
  },
  {
    path: '/',
    element: <UserPage />,
  },
  {
    path: '/bills',
    element: <UserBills />,
  },
];
