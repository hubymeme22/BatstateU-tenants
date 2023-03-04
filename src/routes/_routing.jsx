import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { adminRoutes } from './admin';
import { userRoutes } from './users';
import { errorRoute } from './error';

const router = createBrowserRouter([...adminRoutes, ...userRoutes, errorRoute]);

function RoutingSystem() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default RoutingSystem;
