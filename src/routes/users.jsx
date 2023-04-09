import Index from '../pages/user/login/Index';

import Main from '../layouts/main';
import Notification from '../pages/user/Notification/Notification';
import Form from '../pages/user/Form/Form';
import Account from '../pages/user/Account/Account';
import Forgot from '../pages/user/ForgotPass/Forgot';
import PinInput from '../pages/user/ForgotPass/components/PinInput';
import ResetPassword from '../pages/user/ForgotPass/components/ResetPassword';
export const userRoutes = [
  {
    path: '/login',
    element: <Index />,
  },
  {
    path: '/forgotpass',

    children: [
      {
        index: true,
        element: <Forgot />,
      },
      {
        path: 'pinInput',
        element: <PinInput />,
      },
      {
        path: 'passwordreset',
        element: <ResetPassword />,
      },
    ],
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
