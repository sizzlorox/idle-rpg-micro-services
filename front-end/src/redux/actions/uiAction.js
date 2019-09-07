export const SHOW_SPINNER = "[UI] Show Spinner";
export const HIDE_SPINNER = "[UI] Hide Spinner";
export const SHOW_TOASTER = "[UI] Show Toaster";

export const SET_HOME_CARD_TAB = "[UI] Set Home Card Tab";

export const showSpinner = () => ({
  type: SHOW_SPINNER
});

export const hideSpinner = () => ({
  type: HIDE_SPINNER
});

export const showToaster = data => ({
  type: SHOW_TOASTER,
  payload: data
});

export const setHomeCardTab = data => ({
  type: SET_HOME_CARD_TAB,
  payload: data
});
