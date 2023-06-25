import { all } from 'redux-saga/effects';
import { rootAuthenticationSaga, rootCreateUserSaga } from './auth';

export function* watcherSaga(): any {
  yield all([...rootAuthenticationSaga, ...rootCreateUserSaga]);
}
