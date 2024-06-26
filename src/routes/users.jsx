import Login from '../pages/user/Login';

import Main from '../layouts/main';
import Notification from '../pages/user/Notification/Notification';
import Form from '../pages/user/Form/Form';
import Account from '../pages/user/Account/Account';
import Forgot from '../pages/user/ForgotPass/Forgot';

export const userRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgotpass',
    element: <Forgot />,
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
