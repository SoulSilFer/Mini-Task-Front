// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { SessionStorage } from 'core/infra';
// import { onStartRefreshTokenPooling } from 'core/adapters';
// import { useAppDispatch, useAppSelector } from 'hooks';

// export function useAppAuth(): void {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const session = new SessionStorage();

//   const { refreshToken } = useAppSelector((state) => state.authentication);

//   const redirect = (): void => navigate('/login');

//   useEffect(() => {
//     const token = session.get('token');

//     if (!token) {
//       redirect();
//     }

//     if (!refreshToken && token) {
//       dispatch(onStartRefreshTokenPooling());
//     }
//   }, [refreshToken]);
// }
