import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';

// Redux
import { store } from './redux/store';

// Components
import ErrorBoundary from './components/ErrorBoundary';

// Routes
import routes from './routes';

ReactDOM.render((
  <ErrorBoundary>
    <Provider store={store}>
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
    </Provider>
  </ErrorBoundary>
), document.getElementById('app'));


// if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
//   window.addEventListener('load', () => (navigator.serviceWorker.addEventListener('/service-worker.js')));
// }