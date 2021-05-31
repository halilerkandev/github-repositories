import { pathToRegExp } from './utils.js';

const routes = [
  {
    path: '/',
    page: 'form-page',
  },
  {
    path: '/:login/repositories',
    page: 'repositories-page',
  },
];

const createRouteMatcher = (routes) => async () => {
  const routesWithResult = routes.map((route) => ({
    route,
    result: location.pathname.match(pathToRegExp(route.path)),
  }));
  let matchedRoute = routesWithResult.find(
    (routeWithResult) => routeWithResult.result !== null
  );
  if (!matchedRoute) {
    matchedRoute = {
      route: routes[0],
      result: [location.pathname],
    };
  }
  return matchedRoute;
};

export const getMatchedRoute = createRouteMatcher(routes);
