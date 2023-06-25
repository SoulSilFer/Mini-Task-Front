import { takeLatest } from 'redux-saga/effects';
import { makeApiURL } from 'core/infra/http/api-url-factory';
import { ApiClient } from 'core/infra';
import { createSagaRequest } from '../../handlers/request';

import { AuthenticationParams } from 'core/entities/auth/authentication';
import { AuthenticationController } from 'core/redux/controllers';
import {
  onAuth,
  onAuthError,
  onAuthLoad,
  onAuthSuccess
} from 'core/redux/reducers';

const client = new ApiClient();
const controller = new AuthenticationController(
  makeApiURL('authenticate'),
  client
);

export const rootAuthenticationSaga = [
  takeLatest(
    onAuth.type,
    createSagaRequest<AuthenticationParams>({
      request: async (params) => await controller.auth(params),
      onError: onAuthError,
      onLoad: onAuthLoad,
      onSuccess: onAuthSuccess
    })
  )
];
