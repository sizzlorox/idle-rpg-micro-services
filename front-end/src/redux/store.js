import { applyMiddleware, createStore, compose } from "redux";
import { reducers } from "./reducers";
import { accountMiddleware } from "./middleware/accountMiddleware";
import { apiMiddleware } from "./middleware/apiMiddleware";

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...accountMiddleware, apiMiddleware))
);
