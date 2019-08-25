import Home from './views/Home';
import isAuthorized from './core/auth';

export default [
  {
    path: '/',
    component: Home,
    needAuth: false,
    isAuthorized: () => isAuthorized(),
  }
];