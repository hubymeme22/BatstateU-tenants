import Index from '../pages/user/login/Index';

import Main from '../layouts/main';
import UserBills from '../pages/user/userBills/UserBills';

export const userRoutes = [
  {
    path: '/login',
    element: <Index />,
  },
  {
    path: '/',
    element: <Main />,
    children: [
      {
        index: true,
        element: <>Form</>,
      },
      {
        path: 'notification',
        element: <>Notification</>,
      },
    ],
  },
  {
    path: '/bills',
    element: <UserBills />,
  },
];
