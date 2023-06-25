import { RootState } from 'core/infra/frameworks/redux'
import { useSelector } from 'react-redux'

export function useAppSelector<S> (selector: (state: RootState) => S): S {
  return useSelector<RootState, S>(selector)
}
