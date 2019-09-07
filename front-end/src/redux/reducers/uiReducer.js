import {
  HIDE_SPINNER,
  SHOW_SPINNER,
  SHOW_TOASTER,
  SET_HOME_CARD_TAB
} from "../actions/uiAction";
import produce from "immer";
import AppToaster from "../../containers/Toasters";
import { REGISTER_SUCCESS } from "../actions/accountAction";

const initialState = {
  spinner: false,
  homeCardTab: "login"
};

export const uiReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHOW_SPINNER:
        draft.spinner = true;
        break;
      case HIDE_SPINNER:
        draft.spinner = false;
        break;
      case SHOW_TOASTER:
        AppToaster.show({
          timeout: 2500,
          intent: action.payload.status !== "OK" ? "danger" : "success",
          message: action.payload.message
        });
        break;
      case SET_HOME_CARD_TAB:
        draft.homeCardTab = action.payload;
        break;

      case REGISTER_SUCCESS:
        draft.homeCardTab = "login";
        break;
    }
  });
