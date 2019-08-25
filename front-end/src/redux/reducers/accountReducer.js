import { LOGIN_SUCCESS, REGISTER_SUCCESS } from '../actions/accountAction';
import produce from 'immer';

const initialState = {};

export const accountReducer = (state = initialState, action) => produce(state, draft => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      console.log(action.payload);
      localStorage.setItem('token', action.payload.token);
      break;
    case REGISTER_SUCCESS:
      break;
  }
});
