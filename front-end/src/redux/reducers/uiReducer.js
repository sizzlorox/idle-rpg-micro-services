import {
  HIDE_SPINNER,
  SHOW_SPINNER,
  SHOW_TOASTER,
} from '../actions/uiAction';
import produce from 'immer';
import AppToaster from '../../containers/Toasters';

const initialState = {
  spinner: false,
};

export const uiReducer = (state = initialState, action) => produce(state, draft => {
  switch(action.type) {
    case SHOW_SPINNER:
      draft.spinner = true;
      break;
    case HIDE_SPINNER:
      draft.spinner = false;
      break;
    case SHOW_TOASTER:
      AppToaster.show({
        timeout: 2500,
        intent: action.payload.status !== 'OK' ? 'danger' : 'success',
        message: action.payload.message,
      });
      break;
  }
});
