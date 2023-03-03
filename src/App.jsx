import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { userRoutes, adminRoutes, errorRoute } from './utils/routes';

const router = createBrowserRouter([...userRoutes, ...adminRoutes, errorRoute]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
