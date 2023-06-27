// const BACKEND_BASEURL = 'http://localhost:3000';
const BACKEND_BASEURL = 'nodejs-production-c858.up.railway.app';

export const makeApiURL = (path: string): string =>
  `${BACKEND_BASEURL}/${path}`;
