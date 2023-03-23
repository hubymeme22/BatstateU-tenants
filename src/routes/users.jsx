import Index from '../pages/user/login/Index';

import Main from '../layouts/main';
import Notification from '../pages/user/Notification/Notification';
import Form from '../pages/user/Form/Form';
import Account from '../pages/user/Account/Account';
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
        element: <Form />,
      },

      {
        path: 'notification',
        element: <Notification />,
      },
      {
        path: 'account',
        element: <Account />,
      },
    ],
  },
];
