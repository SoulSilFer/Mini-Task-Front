import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CreateUserParams,
  CreateUserSucess,
  HttpErrorResponsePreValidation
} from 'core/entities';

type CreateUser_StateProps = {
  createUser: CreateUserSucess | undefined;
  createUserLoad: boolean;
  createUserError: HttpErrorResponsePreValidation | undefined;
};

const initialState: CreateUser_StateProps = {
  createUser: undefined,
  createUserLoad: false,
  createUserError: undefined
};

const createUserSlice = createSlice({
  name: 'createUser',
  initialState: initialState,
  reducers: {
    onCreateUser(_state, _action: PayloadAction<CreateUserParams>) {},

    onCreateUserLoad(state, action) {
      return { ...state, createUserLoad: action.payload };
    },

    onCreateUserClear(state) {
      return {
        ...state,
        createUser: undefined,
        createUserError: undefined
      };
    },

    onCreateUserSuccess(state, action) {
      return {
        ...state,
        createUser: action.payload,
        createUserError: undefined
      };
    },

    onCreateUserError(state, action) {
      return {
        ...state,
        createUser: undefined,
        createUserError: action.payload
      };
    }
  }
});

export const {
  onCreateUser,
  onCreateUserError,
  onCreateUserLoad,
  onCreateUserClear,
  onCreateUserSuccess
} = createUserSlice.actions;

export default createUserSlice.reducer;
