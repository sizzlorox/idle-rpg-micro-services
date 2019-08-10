export const SHOW_SPINNER = '[UI] Show Spinner';
export const HIDE_SPINNER = '[UI] Hide Spinner';

export const showSpinner = () => ({
  type: SHOW_SPINNER,
});

export const hideSpinner = () => ({
  type: HIDE_SPINNER,
});
