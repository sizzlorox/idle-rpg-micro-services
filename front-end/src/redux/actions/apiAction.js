export const API_REQUEST = '[APP] API Request';

export const apiRequest = (method, url, withAuth, body, onSuccess, onError) => ({
  type: API_REQUEST,
  payload: body,
  meta: {
    method,
    url,
    withAuth,
    onSuccess,
    onError,
  },
});
