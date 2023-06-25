import { HttpResponse, HttpStatusCode } from 'core/entities';
import { put } from 'redux-saga/effects';

interface OptionsType<P> {
  request: (payload: P) => any;
  onLoad: (start: boolean) => any;
  onError: (error: string | object | any) => any;
  onSuccess: (data: any) => any;
}

interface IActionCreator<P> {
  type: string;
  payload: P;
}

export function createSagaRequest<A>(options: OptionsType<A>) {
  return function* (action: IActionCreator<A>) {
    try {
      yield put(options.onLoad(true));

      const { payload } = action;
      const { statusCode, body }: HttpResponse = yield options.request(payload);

      if (
        [
          HttpStatusCode.ok,
          HttpStatusCode.created,
          HttpStatusCode.noContent
        ].includes(statusCode)
      ) {
        yield put(options.onSuccess(body));
      } else {
        yield put(options.onError(body));
      }

      yield put(options.onLoad(false));
    } catch (error) {
      yield put(options.onError(error));
    }
  };
}
