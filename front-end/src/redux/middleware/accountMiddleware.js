import {
  LOGIN_ACCOUNT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_ACCOUNT,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from '../actions/accountAction';
import { showSpinner } from '../actions/uiAction';
import { apiRequest } from '../actions/apiAction';

const URL = NODE_ENV.includes('production')
  ? '/v1/account'
  : 'http://localhost:5000/v1/account';

export const loginAccountFlow = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === LOGIN_ACCOUNT) {
    dispatch(apiRequest('POST', `${URL}/login`, action.payload, LOGIN_SUCCESS, LOGIN_ERROR));
    dispatch(showSpinner());
  }
};

export const registerAccountFlow = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === REGISTER_ACCOUNT) {
    dispatch(apiRequest('POST', `${URL}/login`, action.payload, REGISTER_SUCCESS, REGISTER_ERROR));
    dispatch(showSpinner());
  }
};
export const accountMiddleware = [
  loginAccountFlow,
  registerAccountFlow,
];
