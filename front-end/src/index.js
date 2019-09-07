import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import history from './commons/history';

// Redux
import { store } from './redux/store';

// Components
import ErrorBoundary from './components/ErrorBoundary';

// Routes
import routes from './routes';

ReactDOM.render((
  <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter history={history}>
        <Switch>
          {
            routes.map(
              ({ path, component, needAuth, isAuthorized }) => {
                if (needAuth) {
                  return isAuthorized()
                    ? (
                      <Route
                        key={path}
                        path={path}
                        component={component}
                        isAuthorized={isAuthorized()}
                      />
                    )
                    : <Redirect to="/" />
                }

                return (
                  <Route
                    key={path}
                    path={path}
                    component={component}
                    isAuthorized={isAuthorized()}
                  />
                );
              }
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