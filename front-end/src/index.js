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
              ({ path, Component, needAuth, isAuthorized }) => {
                if (needAuth) {
                  return isAuthorized()
                    ? (
                      <Route
                        key={path}
                        path={path}
                        render={() => <Component />}
                      />
                    )
                    : <Redirect to="/" />
                }

                return (
                  <Route
                    key={path}
                    path={path}
                    render={() => <Component />}
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