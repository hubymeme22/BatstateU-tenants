import { useRoutes } from 'react-router-dom';

import { adminRoutes } from './admin';
import { userRoutes } from './users';
import { errorRoute } from './error';

function RoutingSystem() {
  const routes = useRoutes([...adminRoutes, ...userRoutes, errorRoute]);
  return routes;
}

export default RoutingSystem;
