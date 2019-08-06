import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';

// Components
import ErrorBoundary from './components/ErrorBoundary';

// Routes
import routes from './routes';

ReactDOM.render((
  <ErrorBoundary>
    <BrowserRouter>
      <Switch>
        {
          routes.map(
            ({ path, component}) => (
              <Route
                key={path}
                path={path}
                component={component}
              />
            )
          )
        }
      </Switch>
    </BrowserRouter>
  </ErrorBoundary>
), document.getElementById('app'));


// if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
//   window.addEventListener('load', () => (navigator.serviceWorker.addEventListener('/service-worker.js')));
// }