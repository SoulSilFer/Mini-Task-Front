const BACKEND_BASEURL = 'http://localhost:3000';

export const makeApiURL = (path: string): string =>
  `${BACKEND_BASEURL}/${path}`;
