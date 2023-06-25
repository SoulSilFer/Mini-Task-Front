import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AuthenticationParams,
  AuthenticationSucess,
  HttpErrorResponsePreValidation
} from 'core/entities';

type Authentication_StateProps = {
  auth: AuthenticationSucess | undefined;
  authLoad: boolean;
  authError: HttpErrorResponsePreValidation | undefined;
};

const initialState: Authentication_StateProps = {
  auth: undefined,
  authLoad: false,
  authError: undefined
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    onAuth(state, action: PayloadAction<AuthenticationParams>) {},

    onAuthLoad(state, action) {
      return { ...state, authLoad: action.payload };
    },

    onAuthClear(state) {
      return {
        ...state,
        auth: undefined,
        authError: undefined
      };
    },

    onAuthSuccess(state, action) {
      return { ...state, auth: action.payload, authError: undefined };
    },

    onAuthError(state, action) {
      return { ...state, auth: undefined, authError: action.payload };
    },

    onLogout(state) {
      return {
        ...state,
        auth: undefined,
        authError: undefined,
        authLoad: false
      };
    },

    onStartRefreshTokenPooling() {},
    onRefreshTokenPoolingHasStart(state, action) {
      return {
        ...state,
        refreshToken: action.payload,
        refreshTokenError: undefined
      };
    },
    onRefreshTokenPoolingStop(state) {
      return {
        ...state,
        refreshToken: undefined
      };
    },
    onRefreshTokenPoolingLoad(state, action) {
      return { ...state, refreshTokenLoad: action.payload };
    }
  }
});

export const {
  onAuth,
  onAuthError,
  onAuthLoad,
  onAuthClear,
  onAuthSuccess,
  onRefreshTokenPoolingStop,
  onRefreshTokenPoolingLoad,
  onStartRefreshTokenPooling,
  onRefreshTokenPoolingHasStart,
  onLogout
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
