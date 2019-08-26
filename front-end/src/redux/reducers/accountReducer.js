import { LOGIN_SUCCESS, REGISTER_SUCCESS } from '../actions/accountAction';
import produce from 'immer';
import auth from '../../core/auth';

const initialState = {
  isAuthorized: auth.isAuthorized(),
};

export const accountReducer = (state = initialState, action) => produce(state, draft => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      console.log('auth', auth.isAuthorized());
      if (auth.isAuthorized()) {
        return draft.isAuthorized = true;
      }

      draft.isAuthorized = false;
      break;
    case REGISTER_SUCCESS:
      break;
  }
});
