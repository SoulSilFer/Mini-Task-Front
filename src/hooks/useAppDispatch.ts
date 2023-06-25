import { AppDispatch } from 'core/infra/frameworks/redux';
import { useDispatch } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';

export const useAppDispatch = (): Dispatch<AnyAction> =>
  useDispatch<AppDispatch>();
