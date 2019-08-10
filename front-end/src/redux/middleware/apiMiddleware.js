import { API_REQUEST } from '../actions/apiAction';

export const apiMiddleware = ({ dispatch }) => next => action => {
  if (action.type === API_REQUEST) {
    const { method, url, onSuccess, onError } = action.meta;
    let payload = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method,
    };
    if (method === 'POST') {
      payload.body = action.payload;
    }

    fetch(url, payload)
      .then(response => response.json())
      .then((data) => {
        if (data.status !== 'OK') {
          return dispatch({ type: onError, payload: data });
        }
        dispatch({ type: onSuccess, payload: data });
      })
      .catch(error => {
        dispatch({ type: onError, payload: error });
      });
  }

  return next(action);
};