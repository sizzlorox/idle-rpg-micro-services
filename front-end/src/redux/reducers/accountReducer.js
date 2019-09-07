import produce from 'immer';
import { LOGIN_SUCCESS, REGISTER_SUCCESS } from '../actions/accountAction';

const initialState = {};

export const accountReducer = (state = initialState, action) => produce(state, draft => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      break;
    case REGISTER_SUCCESS:
      
      break;
  }
});
