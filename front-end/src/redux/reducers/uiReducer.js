import { HIDE_SPINNER, SHOW_SPINNER } from '../actions/uiAction';
import produce from 'immer';

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
  }
});
