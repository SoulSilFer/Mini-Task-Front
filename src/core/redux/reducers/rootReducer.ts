import { combineReducers } from 'redux';

import authenticationReducer from './auth/authentication.reducer';
import createUserSliceReducer from './auth/create-user.reducer';

export const rootReducer = combineReducers({
  authentication: authenticationReducer,
  createUser: createUserSliceReducer
});
