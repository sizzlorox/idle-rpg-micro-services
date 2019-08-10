import { combineReducers } from 'redux';
import { accountReducer } from './accountReducer';
import { uiReducer } from './uiReducer';

export const reducers = combineReducers({
  ui: uiReducer,
  accouunt: accountReducer,
});
