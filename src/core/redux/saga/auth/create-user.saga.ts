import { takeLatest } from 'redux-saga/effects';
import { makeApiURL } from 'core/infra/http/api-url-factory';
import { ApiClient } from 'core/infra';
import { createSagaRequest } from '../../handlers/request';

import { AuthenticationController } from 'core/redux/controllers';
import {
  onCreateUser,
  onCreateUserError,
  onCreateUserLoad,
  onCreateUserSuccess
} from 'core/redux/reducers';
import { CreateUserParams } from 'core/entities';

const client = new ApiClient();
const controller = new AuthenticationController(makeApiURL('user'), client);

export const rootCreateUserSaga = [
  takeLatest(
    onCreateUser.type,
    createSagaRequest<CreateUserParams>({
      request: async (params) => await controller.auth(params),
      onError: onCreateUserError,
      onLoad: onCreateUserLoad,
      onSuccess: onCreateUserSuccess
    })
  )
];
