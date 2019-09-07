import Home from './views/Home';
import auth from './core/auth';

export default [
  {
    path: '/',
    Component: Home,
    needAuth: false,
    isAuthorized: () => auth.isAuthorized(),
  }
];