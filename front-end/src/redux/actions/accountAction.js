export const LOGIN_ACCOUNT = '[ACCOUNT] Login';
export const LOGIN_SUCCESS = '[ACCOUNT] Login Success';
export const LOGIN_ERROR = '[ACCOUNT] Login Error';
export const REGISTER_ACCOUNT = '[ACCOUNT] Register';
export const REGISTER_SUCCESS = '[ACCOUNT] Register Success';
export const REGISTER_ERROR = '[ACCOUNT] Register Error';

export const loginAccount = (data) => ({
  type: LOGIN_ACCOUNT,
  payload: data,
});

export const registerAccount = (data) => ({
  type: REGISTER_ACCOUNT,
  payload: data,
});
