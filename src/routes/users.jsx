import Login from '../pages/user/login/Login';
import UserPage from '../pages/user/userPage/UserPage';
import UserBills from '../pages/user/userBills/UserBills';
export const userRoutes = [
  {
    path: '/login',
    element: <Login />,
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
